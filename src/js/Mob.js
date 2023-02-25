import * as THREE from 'three';
import {scene} from './sceneManager';
import { Projectile, projectiles } from './Projectile';
import { Vector2 } from 'three';

export class Mob {
    

    constructor() {
        this.mobMesh = null; 
    }

    spawn(x, y) {
        const geometry = new THREE.PlaneGeometry( 100, 100, 1, 1 ); 
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        this.mobMesh = new THREE.Mesh( geometry, material );
        scene.add( this.mobMesh );
        this.mobMesh.position.x = x;
        this.mobMesh.position.y = y;
        scene.add( this.mobMesh );
    }

    fireProjectile() {
        const projectile = new Projectile(this.mobMesh.position.x,  this.mobMesh.position.y, new Vector2(0, -1));
        projectiles.push(projectile);
    }
}