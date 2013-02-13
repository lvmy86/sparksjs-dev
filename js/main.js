// main.js bootstraps a require.js-powered application

// Require.js allows us to configure shortcut alias (path)
// If you don't set these here, when you come to use a module with
// 'define'(['jquery']) - for example
// it looks for a local file at js/jquery.js
require.config({
  // At this time (Oct 2012) Underscore and Backbone are not AMD compatible
  shim: {
    "three": {
      deps: [],
      exports: "THREE"  //attaches "THREE" to the window object
    },
    "tween": {
      deps: [],
      exports: "TWEEN"
    },
    "sparks": {
      deps: ["three", "tween"],
      exports: "SPARKS"
    },
    "threex.sparks": {
      deps: ["three", "sparks"],
      exports: "THREEx.Sparks"
    },
    "threex.windowresize": {
      deps: ["three"],
      exports: "THREEx.WindowResize"
    }
  },
  paths: {
    three: '//cdnjs.cloudflare.com/ajax/libs/three.js/r54/three.min',
    tween: 'vendor/Tween',
    sparks: 'vendor/Sparks',
    'threex.sparks': 'vendor/THREEx.Sparks',
    'threex.windowresize': 'vendor/THREEx.WindowResize'
  }

});

require([
  'app'
], function(App){  
  new App().start();  
});