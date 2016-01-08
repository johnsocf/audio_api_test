/**
 * Created by catherinejohnson on 11/29/15.
 */
var dogBarkingBuffer = null;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext(),
    osc = context.createOscillator(),
    osc2 = context.createOscillator(),
    w = window.innerWidth,
    h = window.innerHeight,
    gain = context.createGain();

osc.frequency = 400;
osc.connect(context.destination);
osc.start(0);

gain.gain.value = 100;
gain.connect(osc.frequency);

osc2.frequency.value = 5;
osc2.connect(gain);
osc2.start(0);

$(document.body).on('mousemove', function(e) {
    osc.frequency.value = e.clientY / h * 1000 + 200;
    osc2.frequency.value = e.clientX / w * 30 + 5;
    console.log('move')
});

var offlineCtx = new OfflineAudioContext(2,44100*40,44100);
source = offlineCtx.createBufferSource();

function loadDogSound(url) {
    var request = new XMLHttpRequest();
    request.open("GET", '../audio/09 Waiting In Vain.mp3', true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            dogBarkingBuffer = buffer;
            attachHandlers();

        }, function(error){
            console.log('decode audio data error', error)
        });
    }
    request.send();
}

function attachHandlers() {
    $('.image-area').on('click', function(){
        playSound(dogBarkingBuffer);
    });

}

function playSound(buffer) {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);
}

loadDogSound();
