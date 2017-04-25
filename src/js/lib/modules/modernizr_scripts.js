define(function() {
    console.log(Modernizr);

    if (Modernizr.displayrunin) {
      console.log('displayruninis here !')
    } else {
      console.log('displayrunin is NOT here!')
    };

    if (Modernizr.backdropfilter) {
      console.log('backdropfilter is here!')
    } else {
      console.log('backdropfilter is NOT here!')
    }

}); //end define()
