import * as THREE from 'three';
import {scene, camera, removeMesh} from './sceneManager';

export class Projectile {
    constructor(posX, posY, move) {
        const geometry = new THREE.PlaneGeometry( 30, 30, 1, 1 ); 
        const material = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide } );
        this.projectileMesh = new THREE.Mesh( geometry, material );
        this.projectileMesh.position.x = posX;
        this.projectileMesh.position.y = posY;
        this.move = move;
        scene.add(this.projectileMesh);
    }
}

export let projectiles = [];

export const updateProjectilesPosition = function() {
    var i = projectiles.length;
    while (i--) {
        updateMove(projectiles[i]);
        removeOutOfCameraProjectile(projectiles[i], i);
    }
};

const updateMove = function(p) {
    p.projectileMesh.position.x += p.move.x;
    p.projectileMesh.position.y += p.move.y;
};

const removeOutOfCameraProjectile = function(p, i) {
    let meshParam = p.projectileMesh.geometry.parameters;
    let meshPosition = p.projectileMesh.position;

    if(meshPosition.x - meshParam.width/2 > camera.right || 
        meshPosition.x + meshParam.width/2 < camera.left ||
        meshPosition.y - meshParam.height/2 > camera.top ||
        meshPosition.y + meshParam.height/2 < camera.bottom
    ){
        removeProjectile(p, i);
    }
};

export const removeProjectile = function(p, i) {
    projectiles.slice(i,1);
    removeMesh(p.projectileMesh);
};
