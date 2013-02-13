define([
  'Engine',
  'three'
], function(Engine, THREE){
  
  function App() {
    console.log("Firing up the app");
    
    this.engine = new Engine(document.getElementById('container')); 
    //this.engine.boilerplate();
  }
  
  App.prototype.addCylinder = function() {
    // ---TEST----
    var geometry	= new THREE.CylinderGeometry( 5, 5, 20, 32 );
  	//var geometry	= new THREE.CubeGeometry( 10, 10, 10 );
  	var mesh	= new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
  	mesh.position.y	= -10;
  	this.engine.addObject(mesh);
  };
  
  
  App.prototype.start = function() {
    this.addCylinder();
    this.engine.animate();

    
  };
  
  return App;
});


