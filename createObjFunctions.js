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