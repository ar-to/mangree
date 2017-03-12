({
  baseUrl: "../src/js",//relative to gulpfile
  mainConfigFile: '../src/js/require.config.js',//relative to gulpfile
  paths: {
    nav: 'lib/modules/navmod',//relative to baseUrl
    smoothscll: 'lib/modules/smoothscroll',
    nav_color: 'lib/modules/nav_color'
  },
  include: ['require.config'],//relative to baseUrl
  //name: "../../tools/almond",//relative to baseURL
  name: "../../bower_components/almond/almond",//relative to baseURL
  out: "../dist/js/rjs_bundle.js"//relative to rjs.build.js
})
