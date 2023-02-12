import './style/main.css'
import * as THREE from 'three'

// State
let isMoving = false;
let speedX = 0;
let speedY = 0;

// Init scene
const scene = new THREE.Scene();

// Init camera
let width = window.innerWidth
let height = window.innerHeight
const camera = new THREE.OrthographicCamera(
  -width/2, width/2, height/2, -height/2, 1, 1000
);
camera.position.z = 1000;

// Init renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height)

// Init square
const geometry = new THREE.PlaneGeometry( 100, 100, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } );
const square = new THREE.Mesh( geometry, material );
scene.add( square );

// Rendered loop
function animate() {
  update()
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
animate();

//Window resize
window.addEventListener('resize', () => {
  width = window.innerWidth
  height = window.innerHeight
  renderer.setSize(width, height);

  camera.left = -width / 2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = -height / 2;
  camera.updateProjectionMatrix();      
})

// Move onclick
window.addEventListener('contextmenu', (event) =>
{
    isMoving = true;
    let targetX = event.clientX - width/2;
    let targetY = -event.clientY + height/2;
    let distX = square.position.x-targetX;
    let distY = square.position.y-targetY;
    let ratio = Math.abs(distX/distY);
    speedX = ratio / (1 + ratio);
    speedY = 1 - speedX;
    speedX *= 10;
    speedY *= 10;
    isMoving = true;
    if(distX > 0)
      speedX = -speedX
    if(distY > 0)
      speedY = -speedY
})


function update() {
  if(isMoving){
    square.position.x += speedX;
    square.position.y += speedY;
  }
}

