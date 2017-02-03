define(function(){
  console.log('nav script module loaded');
  return {
    smoothScroll: function() {
//smooth scroll
$('a[href*="#"]:not([href="#"])').click(function() {
     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
       var target = $(this.hash);
       target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
       if (target.length) {
         $('html, body').animate({
           scrollTop: target.offset().top
         }, 1000);
         return false;
       }
     }
   });//end smooth scroll
 }//end smoothscll method as function
 };//end return
});//end define()
