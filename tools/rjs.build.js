//This files is used for running this file form CLI for manual optimization; 
//changes here should match the gulpfile requireopt task
({
  baseUrl: "../src/js",//relative to gulpfile
  //mainConfigFile is relative to gulpfile; used to tell optimizer to read the main.js file 
  //used for requirejs module loading; needed for shim see:http://www.requirejs.org/docs/optimization.html#mainConfigFile
  mainConfigFile: '../src/js/require.config.js',
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
