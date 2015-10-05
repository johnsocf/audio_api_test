/**
 * Created by catherinejohnson on 9/27/15.
 */
$(document).ready(function(){
    var audio = document.getElementById('howl');
//    audio.playbackRate = 1.0;

    //audio.currentTime = 5;



    setInterval(function(){
        console.log(Math.round(audio.currentTime));
        if (Math.round(audio.currentTime) === 5) {
            audio.playbackRate = -1.0;
            audio.pause();
            audio.play();
        }
    }, 10);


});