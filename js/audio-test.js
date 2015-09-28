/**
 * Created by catherinejohnson on 9/27/15.
 */
$(document).ready(function(){
    var audio = document.getElementById('howl');
    audio.playbackRate = -1.0;

//    audio.on('onratechange', vidChanged);
//
//    function vidChanged () {
//        console.log('video changed');
//    }

    audio.onratechange = function() {myFunction()};

    function myFunction() {
        alert("The playing speed of the video was changed");
    }

});