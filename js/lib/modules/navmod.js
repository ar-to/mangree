define(function(){
  console.log('nav script module loaded');
  return {
    navani: function() {
    $(document).ready(function() {
        //adds a class to #nav and a three line div before #nav; diplay style is controlled with css
        $("#nav").addClass("js").before('<div id="menu">☰</div>');
        //adds the toggle on the #nav to open li
        $("#menu").click(function() {
            //$("#nav").toggle();//opens #nav menu on click of #menu without animation
            $("#nav").slideToggle("slow"); //adds a slideDown() & slideUp() methods in one
        });
        //hide logo when mobile
        $(window).resize(function() {
            if (window.innerWidth <= 524) {
                //hide logo class with image when mobile
                $("#logo").addClass("logoHide")
            }
        }); //END hide mobile logo
        //removes the style diplay:none on the #nav when window expanded > 768
        $(window).resize(function() {
            if (window.innerWidth > 768) {
                $("#nav").removeAttr("style");
              }
          }); //END three-line nav
        $(window).resize(function() {
            if (window.innerWidth > 524) {

                $("#logo").removeClass("logoHide");//removes logo hide class
            }
        }); //END three-line nav
        //add nav animation on scroll
        $(window).scroll(function() {
            if ($(document).scrollTop() > 50) {
                $('#nav').addClass('shrink-nav');
                $('#logo').addClass('shrink-logo');
            } else {
                $('#nav').removeClass('shrink-nav');
                $('#logo').removeClass('shrink-logo');
            }
        }); //end scroll animation
    });//end document ready
  }//end navani method as function
  };//end return
});//end define()
