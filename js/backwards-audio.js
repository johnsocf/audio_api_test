// load audio as a raw array buffer:

fetch("../audio/aquamarine.mp4", process, 0);

function cacheDom() {
    var playing,
        actx,
        gainNode,
        src,
        processDirection;
}

cacheDom();
attachHandlers();

// then process the buffer using decoder
function process(file, time) {
    actx = new (window.AudioContext || window.webkitAudioContext);
    if (!time) time = 0;
    actx.decodeAudioData(file, function(buffer) {

            src = actx.createBufferSource();     // enable using loaded data as source
            gainNode = actx.createGain();
            var channel, tmp, i, t = 0, len, len2;

            // reverse channels
            while(t < buffer.numberOfChannels) {      // iterate each channel
                channel = buffer.getChannelData(t++);   // get reference to a channel
                len = channel.length - 1;               // end of buffer
                len2 = len >>> 1;
                for(i = 0; i < len2; i++) {             // loop to center
                    tmp = channel[len - i];             // from end -> tmp
                    channel[len - i] = channel[i];      // end = from beginning
                    channel[i] = tmp;                   // tmp -> beginning
                }
            }

            // play
            gainNode.gain.value = .1;
            src.buffer = buffer;
            src.connect(actx.destination);
            if (!src.start) src.start = src.noteOn(time);
            src.loop = true;
            src.playbackRate.value = 1;
            src.context.gainNode = 0;
            console.log(time + "start from function");
            start(src, time);
            console.log(src);
            console.log(src.context.currentTime + "time once started");

        },
        function() {alert("Could not decode audio!")}
    )
}

function processForwards(file, time) {
    actx = new (window.AudioContext || window.webkitAudioContext);
    if (!time) time = 0;
    actx.decodeAudioData(file, function(buffer) {

            src = actx.createBufferSource();     // enable using loaded data as source
            gainNode = actx.createGain();
            var channel, tmp, i, t = 0, len, len2;

//            // reverse channels
//            while(t < buffer.numberOfChannels) {      // iterate each channel
//                channel = buffer.getChannelData(t++);   // get reference to a channel
//                len = channel.length - 1;               // end of buffer
//                len2 = len >>> 1;
//                for(i = 0; i < len2; i++) {             // loop to center
//                    tmp = channel[len - i];             // from end -> tmp
//                    channel[len - i] = channel[i];      // end = from beginning
//                    channel[i] = tmp;                   // tmp -> beginning
//                }
//            }

            // play
            gainNode.gain.value = .1;
            src.buffer = buffer;
            src.connect(actx.destination);
            if (!src.start) src.start = src.noteOn(time);
            src.loop = true;
            src.playbackRate.value = 1;
            src.context.gainNode = 0;
            console.log(time + "start from function");
            start(src, time);
            console.log(src);
            console.log(src.context.currentTime + "time once started");

        },
        function() {alert("Could not decode audio!")}
    )
}

function start(src, time) {
    console.log(time + "in start function");

    src.start(0, time);
    src.context.currentTime = time;

    console.log(src.context.currentTime + "in start function started");
}

function attachHandlers() {
//    $('.wrapper').on('click', function(){
//        console.log('clicked');
//    });
    $('.wrapper').on('click', function(){
        var element = $(this);
        console.log(src.context.currentTime + "context time on click");
        element.toggleClass('paused');

        var time = src.context.currentTime;
        console.log(time + "variable time");

//        if (element.is('.paused')) src.stop(src.context.currentTime);
//        else {
//            toggleDirection(element);
//            fetch("../audio/aquamarine.mp4", processDirection, time );
//        }
        if (element.is('.paused')) actx.suspend();
        else {
            toggleDirection(element);
            actx.resume(src.context.currentTime);
        }

//        if (element.is('.paused')) src.stop();
//        else src.start(0, time);

    });
}

function toggleDirection(element) {
    element.toggleClass('forward');
    if (element.is('.forward')) {
        processDirection = processForwards; console.log('forwards');
    } else {
        processDirection = process; console.log('backwards');
    }
}

// ajax loader
function fetch(url, callback, time) {
    var xhr = new XMLHttpRequest();
    try {
        xhr.open("GET", url);
        xhr.responseType = "arraybuffer";
        xhr.onerror = function() {alert("Network error")};
        xhr.onload = function() {
            if (xhr.status === 200) callback(xhr.response, time);
            else alert(xhr.statusText);
        };
        xhr.send();
    } catch (err) {alert(err.message)}
}