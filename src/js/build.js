requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    paths: {
        nav: 'modules/navmod',
        smoothscll: 'modules/smoothscroll',
        nav_color: 'modules/nav_color'
    }
});
// Require module nav
  require(['nav', 'smoothscll','nav_color'],function(nav, smoothscll,nav_color){
    nav.navani();
    smoothscll.smoothScroll();
    nav_color.nav_color_change();
  });
