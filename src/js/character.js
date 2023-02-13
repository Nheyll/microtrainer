import * as THREE from 'three'
import {scene, windowWidth, windowHeight} from "./sceneManager"

// State
let speedX = 0;
let speedY = 0;

let character;
export const initCharacter = function () {
    const geometry = new THREE.PlaneGeometry( 100, 100, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } );
    character = new THREE.Mesh( geometry, material );
    scene.add( character );
}

window.addEventListener('contextmenu', (event) =>
{
    let targetX = event.clientX - windowWidth/2;
    let targetY = -event.clientY + windowHeight/2;
    let distX = character.position.x-targetX;
    let distY = character.position.y-targetY;
    let ratio = Math.abs(distX/distY);
    speedX = ratio / (1 + ratio);
    speedY = 1 - speedX;
    speedX *= 10;
    speedY *= 10;
    if(distX > 0)
      speedX = -speedX
    if(distY > 0)
      speedY = -speedY
})

export const updateCharacter = function() {
    character.position.x += speedX;
    character.position.y += speedY;
}
