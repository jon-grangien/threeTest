// Set up the scene, camera, renderer as variables.
  var scene, camera, renderer;
 
  init();
  animate();

  console.log('hejsan :PPpppPp' );

  // Set up scene
  function init() {
 
    container = document.getElementById( 'container' );
    console.log(container)

    // Create scene and set scene size.
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
 
    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    // Create camera, zoom out from model a bit, add it to the scene.
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(0,6,0);
    scene.add(camera); 
  	}

    // Create an event listener that resizes the renderer with the browser window.
    window.addEventListener('resize', function() {
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    });

    // Create a light, set its position, and add it to the scene.
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    scene.add(light);

    // loader manager
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {

		console.log( item, loaded, total );

	};
    
    // texture
 //    var texture = new THREE.Texture();
 //    var loader = new THREE.ImageLoader( manager );
	// loader.load( 'textures/Texture8.png', function ( image ) {
	// 	texture.image = image;
	// 	texture.needsUpdate = true;
	// } );

    // Load in the mesh and add it to the scene.
    var loader = new THREE.OBJLoader(manager);
    loader.load( "obj/planewithhole.obj", function(object){
      
    	object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
      			//var texture1 = new THREE.MeshLambertMaterial({color: 0x55B663});
				//child.material.map = texture1;
			}
		} );
		//object.position.y = -80;
		scene.add(object);

      //mesh = new THREE.Mesh(geometry, material);
      //scene.add(mesh);
    });

    // Add OrbitControls so that we can pan around with the mouse.
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Renders the scene and updates the render as needed.
  	function animate() {
 
    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);
 
    // Render the scene.
    renderer.render(scene, camera);
    //controls.update();
  	}