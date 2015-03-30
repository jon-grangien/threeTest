    var scene, camera, renderer, controls;

    // useful for event listeners
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

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
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(WIDTH, HEIGHT);
        document.body.appendChild(renderer.domElement);

        // Create camera, zoom out from model a bit, add it to the scene.
        camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 10000);
        // camera.position.set(0,0.1,0);
        scene.add(camera); 
        camera.position.z = 10;
        camera.position.y = 25;
        camera.position.x = -7;

        // Create an event listener that resizes the renderer with the browser window.
        window.addEventListener('resize', function() {
            var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
            renderer.setSize(WIDTH, HEIGHT);
            camera.aspect = WIDTH / HEIGHT;
            camera.updateProjectionMatrix();
        });

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );

        // Create a light, set its position, and add it to the scene.
        var light = new THREE.PointLight(0xffffff);
        light.position.set(-100,200,100);
        scene.add(light);

        var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
        };

        var onError = function ( xhr ) {
        };

        THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );


        // Giraffe
        var loader = new THREE.OBJMTLLoader();
        loader.load( "obj/Giraffe.obj", "textures/Giraffe.mtl", function(object){ 
            // object.rotation.x = 30;
            // object.position.y = -5;
            // object.position.z = 5;
            scene.add(object);
        }, onProgress, onError);

        // Sphere
        var radius = 1,
            segments = 16,
            rings = 16;

        // Sphere's material
        var sphereMaterial =
            new THREE.MeshLambertMaterial({
                color: 0xCC0000
            });

        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(
                radius,
                segments,
                rings),
            sphereMaterial);

        sphere.position.x = 10;
        sphere.position.y = 5;

        // add the sphere to the scene
        scene.add(sphere);

        // Add OrbitControls so that we can pan around with the mouse.
        controls = new THREE.OrbitControls(camera, renderer.domElement);
    }

    function animate() {
        requestAnimationFrame(animate);
        
        // Render scene.
        renderer.render(scene, camera);
        controls.update();
    }

    function onDocumentMouseMove( event ) {
        mouseX = ( event.clientX - windowHalfX ) / 2;
        mouseY = ( event.clientY - windowHalfY ) / 2;
    }
