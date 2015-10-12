var audioCtx = new AudioContext();
var offlineCtx = new OfflineAudioContext(2,44100*40,44100);

source = offlineCtx.createBufferSource();

// use XHR to load an audio track, and
// decodeAudioData to decode it and OfflineAudioContext to render it

function getData() {
    request = new XMLHttpRequest();

    request.open('GET', '../audio/aquamarine.mp4', true);

    request.responseType = 'arraybuffer';

    request.onload = function() {
        var audioData = request.response;

        audioCtx.decodeAudioData(audioData, function(buffer) {
            myBuffer = buffer;
            source.buffer = myBuffer;
            var filter = offlineCtx.createBiquadFilter();
            filter.type = "highpass";
            filter.connect(offlineCtx.destination);
            source.connect(filter);

            source.start(0);
            //source.loop = true;
            offlineCtx.startRendering().then(function(renderedBuffer) {
                console.log('Rendering completed successfully');

                var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                var song = audioCtx.createBufferSource();

                song.buffer = renderedBuffer;
                getPeaksAtThreshold(buffer.getChannelData(0),.9);

                song.connect(audioCtx.destination);

                //play.onclick = function() {
                    song.start();
                //}
            }).catch(function(err) {
                    console.log('Rendering failed: ' + err);
                    // Note: The promise should reject when startRendering is called a second time on an OfflineAudioContext
                });
        });
    }

    request.send();
}

function getPeaksAtThreshold(data, threshold) {
    var peaksArray = [];
    var length = data.length;
    for(var i = 0; i < length;) {
        if (data[i] > threshold) {
            peaksArray.push(i);
            // Skip forward ~ 1/4s to get past this peak.
            i += 10000;
        }
        i++;
    }
    console.log(peaksArray);
    return peaksArray;
}

// Run getData to start the process off

getData();
