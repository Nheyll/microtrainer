import * as THREE from 'three';
import {scene, windowWidth, windowHeight} from './sceneManager';

/* State */
/** Calculated values (do not set manually) **/
/*** Character ***/
export let character;

/*** movement for each renderer update ***/
let move = new THREE.Vector2(0,0);

/*** current position ***/
let current = new THREE.Vector2(0,0);

/*** cursor position when player last right clicked ***/
let target = new THREE.Vector2(0,0);

/*** Character direction ***/
const Direction = {
    NW: 'North-West',
    NE: 'North-East',
    SE: 'South-East',
    SW: 'South-West',
    NOT_MOVING: 'Stopped'
};
let moveDirection = '';

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
    });
};

export const updateCharacter = function() {
    updateMove();
};

const onMove = function(event) {
    target.set(event.clientX - windowWidth/2, -event.clientY + windowHeight/2);
    setDirection();
    let dist = new THREE.Vector2(character.position.x-target.x, character.position.y-target.y);
    if(dist.x != 0 && dist.y != 0) {
        let ratio = Math.abs(dist.x/dist.y);
        move.setX(ratio / (1 + ratio) * moveSpeed);
        move.setY(moveSpeed - move.x);
    } else if (dist.x == 0 && dist.y != 0) {
        move.set(0, moveSpeed);
    } else if (dist.x != 0 && dist.y == 0) {
        move.set(moveSpeed, 0);
    } else {
        move.set(0, 0);
    }
    if(dist.x > 0)
        move.setX(-move.x);
    if(dist.y > 0)
        move.setY(-move.y);
};

const setDirection = function () {
    if(target.x > current.x){
        if(target.y > current.y) {
            moveDirection = Direction.NE;
        }else{
            moveDirection = Direction.SE;
        }
    } else {
        if(target.y > current.y) {
            moveDirection = Direction.NW;
        }else{
            moveDirection = Direction.SW;
        }
    }
};

const updateMove = function() {
    if (moveDirection == Direction.NE && (current.x+move.x > target.x || current.y+move.y > target.y)){
        moveDirection = Direction.NOT_MOVING;
    } else if (moveDirection == Direction.NW && (current.x+move.x < target.x || current.y+move.y > target.y)){
        moveDirection = Direction.NOT_MOVING;
    } else if (moveDirection == Direction.SE && (current.x+move.x > target.x || current.y+move.y < target.y)){
        moveDirection = Direction.NOT_MOVING;
    } else if (moveDirection == Direction.SW && (current.x+move.x < target.x || current.y+move.y < target.y)){
        moveDirection = Direction.NOT_MOVING;
    }

    if(moveDirection != Direction.NOT_MOVING){
        current.set(current.x + move.x, current.y + move.y);
        character.position.x = current.x;
        character.position.y = current.y;
    } else {
        character.position.x = target.x;
        character.position.y = target.y;
        current.set(target.x, target.y);
    }
};