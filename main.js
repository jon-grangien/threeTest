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
            scene.add(object);
        }, onProgress, onError);

        sphere1 = createSphere(1, 16, 16, 0xCC0000);
        sphere1.position.x = 10;
        sphere1.position.y = 5;
        scene.add(sphere1);

        sphere2 = createSphere(1.5, 16, 16, 0x00BB00);
        sphere2.position.x = -10;
        sphere2.position.y = 3;
        sphere2.position.z = 8;
        scene.add(sphere2);

        sphere3 = createSphere(0.5, 16, 16, 0x00BBCC);
        sphere3.position.x = -3;
        sphere3.position.y = 6;
        sphere3.position.z = -2;
        scene.add(sphere3);

        sphere4 = createSphere(1.2, 16, 16, 0xBBDDAA);
        sphere4.position.x = -4;
        sphere4.position.y = -2;
        sphere4.position.z = 3;
        scene.add(sphere4);

        sphere5 = createSphere(1.8, 16, 16, 0xDD00DD);
        sphere5.position.x = 4;
        sphere5.position.y = 5;
        sphere5.position.z = 11;
        scene.add(sphere5);

        box1 = createBox(2, 2, 8, 16, 16, 16, 0xDDBBCC);
        // box1.position.x = 2;
        box1.position.y = -1;
        // box1.position.z = 9;
        scene.add(box1);

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
