import * as THREE from 'three';
import {scene} from './sceneManager';
import { Projectile, projectiles } from './Projectile';
import { Vector2 } from 'three';

export class Mob {
    

    constructor() {
        this.hitbox = null; 
    }

    spawn(x, y) {
        const geometry = new THREE.CircleGeometry( 50, 32 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        this.hitbox = new THREE.Mesh( geometry, material );
        scene.add( this.hitbox );
        this.hitbox.position.x = x;
        this.hitbox.position.y = y;
        scene.add( this.hitbox );
    }

    fireProjectile() {
        const projectile = new Projectile(this.hitbox.position.x,  this.hitbox.position.y, new Vector2(1, 0));
        projectiles.push(projectile);
    }
}