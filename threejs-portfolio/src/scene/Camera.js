class Camera {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 5, 10);
    }

    setPosition(x, y, z) {
        this.camera.position.set(x, y, z);
    }

    update() {
        this.camera.updateProjectionMatrix();
    }
}

export default Camera;