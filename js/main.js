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
    
    // in r51 WebGL errors suppressed, but particles stop drawing.
    // THIS IS THE TIPPING POINT: between r50 and r51
    // something changed (possibly in WebGL error handling)
    three: '//cdnjs.cloudflare.com/ajax/libs/three.js/r51/three',
    
    // r50, r49 
    // all draw the particles as expected, but with WebGL errors.
    //three: '//cdnjs.cloudflare.com/ajax/libs/three.js/r50/three',
    //three: '//cdnjs.cloudflare.com/ajax/libs/three.js/r49/Three',
    
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