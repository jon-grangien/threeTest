function createSphere(radius, segments, rings, colorCode) {
	var sphereMaterial =
        new THREE.MeshLambertMaterial({
            color: colorCode
        });

    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(
            radius,
            segments,
            rings),
        sphereMaterial);

    return sphere;
}

function createBox(width, heigth, depth, widthSegments, heightSegments, depthSegments, colorCode) {
	var boxMaterial =
        new THREE.MeshLambertMaterial({
            color: colorCode
        });

    var cube = new THREE.Mesh(
        new THREE.BoxGeometry(
            width,
            heigth,
            depth,
            widthSegments,
            heightSegments,
            depthSegments),
        boxMaterial);

    return cube;
}