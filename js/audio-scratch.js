/**
 * Created by catherinejohnson on 11/29/15.
 */
var dogBarkingBuffer = null;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

var offlineCtx = new OfflineAudioContext(2,44100*40,44100);
source = offlineCtx.createBufferSource();

function loadDogSound(url) {
    var request = new XMLHttpRequest();
    request.open("GET", '../audio/09 Waiting In Vain.mp3', true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            dogBarkingBuffer = buffer;
            playSound(dogBarkingBuffer);
        }, function(error){
            console.log('decode audio data error', error)
        });
    }
    request.send();
}

function playSound(buffer) {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);
}

loadDogSound();
