define(function() {
    console.log('nav_color script module loaded');
    return {
        nav_color_change: function() {
            $(document).ready(function() {

                $(window).scroll(function() {
                    if ($(document).scrollTop() > 50) {
                      $('.clr-change').addClass('nav-color');
                        //$("#body").addClass("red");
                    } else {
                      $('.clr-change').removeClass('nav-color');
                    }
                }); //end scroll
            }); //end document ready
        } //end nav_color_change method as function
    }; //end return
}); //end define()
