define(function() {
    console.log('nav_color script module loaded');
    return {
        nav_color_change: function() {
            $(document).ready(function() {

                $(window).scroll(function() {
                    if ($(document).scrollTop() > 50) {
                      $('.nav-clr-change').addClass('nav-color');
                      $('.link-clr-change').addClass('link-color');
                      $('.toggle-clr-change').addClass('toggle-color');
                        //$("#body").addClass("red");
                    } else {
                      $('.nav-clr-change').removeClass('nav-color');
                      $('.link-clr-change').removeClass('link-color');
                      $('.toggle-clr-change').removeClass('toggle-color');
                    }
                }); //end scroll
            }); //end document ready
        } //end nav_color_change method as function
    }; //end return
}); //end define()
