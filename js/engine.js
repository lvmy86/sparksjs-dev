define([
  'three',
  'sparks',
  'threex.sparks',
  'threex.windowresize'
], function(THREE, SPARKS, THREExSparks, WindowResize) {

  
  function Engine() {    
    var width = window.innerWidth;
    var height = window.innerHeight;
    
    this.scene = new THREE.Scene();
    
		this.camera = new THREE.PerspectiveCamera(70, width / height, 1, 10000);
		this.camera.position.set(0, 0, 100);
    
    this.camera.lookAt(this.scene.position);
    //this.camera.updateProjectionMatrix();
    this.scene.add(this.camera);
    
    // For antialias to work
    // you may need to override your browser's video driver blacklist;
    // but beware - this could compromise security
    // or cause system instability
    // if the driver is really bad.
    // Do not expect end users to do this... but you can try it out in development.
    //
    // In Chrome: go to chrome://flags/
    // Enable 'Override software rendering list Mac, Windows, Linux, Chrome OS'
    // this 'Overrides the built-in software rendering list and enables GPU-acceleration on unsupported system configurations.'
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    });
    this.renderer.setClearColor( 0x000000, 1 );
    this.renderer.setSize(width, height);
    //this.renderer.setFaceCulling(0);
    
    // Any other things a scene item wants to do on render
    this.sceneItemCallbacks = [];
    
    document.body.appendChild(this.renderer.domElement);

    // SPARKS--------------
    WindowResize(this.renderer, this.camera);
    this.sparker = new THREExSparks({
      maxParticles: 400,
      counter: new SPARKS.SteadyCounter(600)
    });
    
    var emitter = this.sparker.emitter();

    var initColorSize	= function(){
    	this.initialize = function( emitter, particle ){
    		particle.target.color().setHSV(0.3, 0.9, 0.4);
    		particle.target.size(150);
    	};
    };

    // Starting position
    this.currentPosition = new THREE.Vector3(0, 0, 0);
    
    // Other bits
    emitter.addInitializer(new initColorSize());
    emitter.addInitializer(new SPARKS.Position( new SPARKS.PointZone( this.currentPosition ) ) );
    emitter.addInitializer(new SPARKS.Lifetime(0,0.8));
    emitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0,250,00))));

    emitter.addAction(new SPARKS.Age());
    emitter.addAction(new SPARKS.Move());
    emitter.addAction(new SPARKS.RandomDrift(1000,0,1000));
    emitter.addAction(new SPARKS.Accelerate(0,-200,0));
    
    // start the emitter
    this.sparker.emitter().start(); 
    // add the container to THREE.scene
    var that = this;
    this.addObject(this.sparker.container(), function () {
      if (that.sparker) {
        that.sparker.update();
      };
    
    });
    
    console.log(this.scene);
  }

  Engine.prototype.animate = function() {
    var that = this;
    window.requestAnimationFrame(function() {
      that.animate();
    });
    
    this.renderer.context.depthMask( true );
    
    // Now the rendering    
    this.renderer.render(this.scene, this.camera);
    
    for (var i = 0; i < this.sceneItemCallbacks.length; i++) {
      this.sceneItemCallbacks[i].call();
    }
  };  

  Engine.prototype.addObject = function(obj, callback) {
    this.scene.add(obj);
    
    if (callback) {
      this.sceneItemCallbacks.push(callback);
    }
  };

  return Engine;
});