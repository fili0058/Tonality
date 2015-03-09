// JavaScript Document

$(document).ready(function(){


    $(".useCSS").css("background", "#d1d1d1");
    changeBlendMode("multiply");
    $("#blends").children("div").click(function() {
        /*alert(this.id);*/

       changeBlendMode(this.id);
    });

});


function parallax(){
    var scrollPos = $(window).scrollTop();

    $("#greenTriBg").css("top", -(scrollPos * 0.35) + "px");

}

$(window).scroll(function () {
       parallax();
});


function changeBlendMode(blendMode) {
    /*alert(blendMode);*/

    $("#blends").children("div").css("background", "white");


    document.querySelector("#" + blendMode).style.background = "#d1d1d1";
    document.querySelector("#result").style.webkitBackgroundBlendMode = blendMode + ', normal';
    document.querySelector("#result").style.backgroundBlendMode = blendMode + ', normal';

}



