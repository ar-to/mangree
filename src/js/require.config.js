requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: './lib',//relative to require.config.js
    paths: {
        modernizr_script: 'modules/modernizr_scripts',
        nav: 'modules/navmod',
        smoothscll: 'modules/smoothscroll',
        nav_color: 'modules/nav_color',
        //prism: 'prism'
    },
    shim: {//using shim to load "browser globals" see: http://www.requirejs.org/docs/api.html#config-shim
      'prism': {
        exports: 'Prism'
      }
    }
});
// Require module nav
  require(['modernizr_script', 'nav', 'smoothscll', 'nav_color', 'prism'],function(modernizr_script, nav, smoothscll, nav_color){
    nav.navani();
    smoothscll.smoothScroll();
    nav_color.nav_color_change();
  });
