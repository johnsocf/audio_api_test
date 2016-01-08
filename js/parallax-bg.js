$(document).ready(function(){
    $(window).scroll(function(){
        $('.parallax-wrapper').each(function(r){
            var pos = $(this).offset().top;
            var scrolled = $(window).scrollTop();
            $('.parallax-wrapper').css('top', -(scrolled * 0.5) + 'px');
        });
    });
});