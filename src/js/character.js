import * as THREE from 'three'
import {scene, windowWidth, windowHeight} from "./sceneManager"

/* State */
/** Calculated values (do not set manually) **/
/*** Character ***/
let character;

/*** movement for each renderer update ***/
let moveX = 0;
let moveY = 0;

/*** current position ***/
let currentX = 0;
let currentY = 0;

/*** cursor position when player last right clicked ***/
let targetX = 0;
let targetY = 0;

/*** Character direction ***/
const Direction = {
    NW: "North-West",
    NE: "North-East",
    SE: "South-East",
    SW: "South-West",
    NOT_MOVING: "Stopped"
}
let moveDirection = "";

/** Character stats **/
/*** Character movespeed ***/
let moveSpeed = 5;

export const initCharacter = function () {
    const geometry = new THREE.PlaneGeometry( 100, 100, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } );
    character = new THREE.Mesh( geometry, material );
    scene.add( character );
    window.addEventListener('contextmenu', (event) => {
        onMove(event);
    })
}

export const updateCharacter = function() {
    updateMove()
}

const onMove = function(event) {
    targetX = event.clientX - windowWidth/2;
    targetY = -event.clientY + windowHeight/2;
    setDirection();
    let distX = character.position.x-targetX;
    let distY = character.position.y-targetY;
    if(distX != 0 && distY != 0) {
        let ratio = Math.abs(distX/distY);
        moveX = ratio / (1 + ratio) * moveSpeed;
        moveY = moveSpeed - moveX;
    } else if (distX == 0 && distY != 0) {
        moveX = 0;
        moveY = moveSpeed;
    } else if (distX != 0 && distY == 0) {
        moveX = moveSpeed;
        moveY = 0;
    } else {
        moveX = 0;
        moveY = 0;
    }
    if(distX > 0)
    moveX = -moveX
    if(distY > 0)
    moveY = -moveY
}

const setDirection = function () {
    if(targetX > currentX){
        if(targetY > currentY) {
            moveDirection = Direction.NE;
        }else{
            moveDirection = Direction.SE;
        }
    } else {
        if(targetY > currentY) {
            moveDirection = Direction.NW;
        }else{
            moveDirection = Direction.SW;
        }
    }
}

const updateMove = function() {
    if (moveDirection == Direction.NE && (currentX+moveX > targetX || currentY+moveY > targetY)){
        moveDirection = Direction.NOT_MOVING;
    } else if (moveDirection == Direction.NW && (currentX+moveX < targetX || currentY+moveY > targetY)){
        moveDirection = Direction.NOT_MOVING;
    } else if (moveDirection == Direction.SE && (currentX+moveX > targetX || currentY+moveY < targetY)){
        moveDirection = Direction.NOT_MOVING;
    } else if (moveDirection == Direction.SW && (currentX+moveX < targetX || currentY+moveY < targetY)){
        moveDirection = Direction.NOT_MOVING;
    }

    if(moveDirection != Direction.NOT_MOVING){
        currentX += moveX;
        currentY += moveY;
        character.position.x = currentX;
        character.position.y = currentY;
    } else {
        character.position.x = targetX;
        character.position.y = targetY;
        currentX = targetX;
        currentY = targetY;
    }
}