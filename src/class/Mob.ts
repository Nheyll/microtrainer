import * as THREE from 'three';
import { Projectile } from './Projectile';
import { SceneManager } from './SceneManager';

export class Mob {
    public sceneManager: SceneManager
    public mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>

    constructor(sceneManager: SceneManager, position: THREE.Vector2) {
        this.sceneManager = sceneManager;
        const geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x = position.x
        this.mesh.position.y = position.y
        this.sceneManager.scene.add(this.mesh);
    }

    fireProjectiles() {
        setInterval(this.fireProjectile, 5000);
    }

    fireProjectile() {
        console.log(this)
        const projectile = new Projectile(this.sceneManager, new THREE.Vector2(this.mesh.position.x, this.mesh.position.y), new THREE.Vector2(0, -1), 30);
        this.sceneManager.projectiles.items.push(projectile);
    }
}