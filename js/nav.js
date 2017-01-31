$(document).ready(function() {
    //adds a class to #nav and a three line div before #nav; diplay style is controlled with css
    $("#nav").addClass("js").before('<div id="menu">☰</div>');
    //adds the toggle on the #nav to open li
    $("#menu").click(function() {
        //$("#nav").toggle();//opens #nav menu on click of #menu without animation
        $("#nav").slideToggle("slow"); //adds a slideDown() & slideUp() methods in one
    });
    //removes the style diplay:none on the #nav when window expanded > 768
    $(window).resize(function() {
        if (window.innerWidth > 768) {
            $("#nav").removeAttr("style");
        }
    }); //END three-line nav
    //add nav animation on scroll
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('nav').addClass('shrink');
        } else {
            $('nav').removeClass('shrink');
        }
    }); //end scroll animation
    //for fun way to hide and show on scroll
    /*$(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('p').hide();
        } else {
            $('p').show();
        }
    });*/
});
