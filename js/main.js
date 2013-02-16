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
    // r55 renders the cylinder but nothing else
    //three: '//cdnjs.cloudflare.com/ajax/libs/three.js/r55/three.min',
    
    // r49 dies during the particle creation phase with 
    //Uncaught TypeError: Object [object Object] has no method 'length'
    three: '//cdnjs.cloudflare.com/ajax/libs/three.js/r49/Three',
    
    // r46 works, but is of course now very outdated
    //three: 'vendor/Three',
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