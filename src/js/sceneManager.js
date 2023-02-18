import * as THREE from 'three';

// Init scene
export const scene = new THREE.Scene();

// Init camera
export let windowWidth = window.innerWidth;
export let windowHeight = window.innerHeight;
export const camera = new THREE.OrthographicCamera(
    -windowWidth/2, windowWidth/2, windowHeight/2, -windowHeight/2, 1, 1000
);
camera.position.z = 1000;

// Init renderer
export const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(windowWidth, windowHeight);

//Window resize
window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    renderer.setSize(windowWidth, windowHeight);

    camera.left = -windowWidth / 2;
    camera.right = windowWidth / 2;
    camera.top = windowHeight / 2;
    camera.bottom = -windowHeight / 2;
    camera.updateProjectionMatrix();      
});
  