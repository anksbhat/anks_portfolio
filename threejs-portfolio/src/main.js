import * as THREE from 'three';
import Scene from './scene/Scene';
import Camera from './scene/Camera';
import Renderer from './scene/Renderer';
import Lighting from './scene/Lighting';
import GridMesh from './objects/GridMesh';
import Spheres from './objects/Spheres';
import OrbitControls from './controls/OrbitControls';

const scene = new Scene();
const camera = new Camera();
const renderer = new Renderer();
const lighting = new Lighting();
const gridMesh = new GridMesh();
const spheres = new Spheres();

scene.add(gridMesh.mesh);
spheres.createSpheres().forEach(sphere => scene.add(sphere));

lighting.setup(scene);
camera.setPosition(0, 5, 10);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    gridMesh.updateRotation();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.update();
    renderer.setSize(window.innerWidth, window.innerHeight);
});