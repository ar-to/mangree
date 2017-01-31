requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    paths: {
        nav: 'modules/navmod',
        smoothscll: 'modules/smoothscroll'
    }
});
// Require module nav
  require(['nav', 'smoothscll'],function(nav, smoothscll){
    nav.navani();
    smoothscll.smoothScroll();
  });
