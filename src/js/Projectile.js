import * as THREE from 'three';
import {scene} from './sceneManager';

export class Projectile {
    constructor(posX, posY, move) {
        const geometry = new THREE.CircleGeometry( 10, 32 );
        const material = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide } );
        this.hitbox = new THREE.Mesh( geometry, material );
        this.hitbox.position.x = posX;
        this.hitbox.position.y = posY;
        this.move = move;
        scene.add(this.hitbox);
    }
}

export let projectiles = [];

export const updateProjectiles = function() {
    projectiles.forEach( p => {
        p.hitbox.position.x += p.move.x;
        p.hitbox.position.y += p.move.y;
    });
};

