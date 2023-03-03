import { isCollision } from '@/utils/collisions';
import * as THREE from 'three';
import { Character } from './Character';
import { SceneManager } from './SceneManager';


export class Projectile {
    public sceneManager: SceneManager
    public mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
    public move: THREE.Vector2;
    public size: number;

    constructor(sceneManager: SceneManager, position: THREE.Vector2, move: THREE.Vector2, size: number) {
        this.sceneManager = sceneManager
        this.size = size
        const geometry = new THREE.PlaneGeometry(30, 30, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x = position.x;
        this.mesh.position.y = position.y;
        this.move = move;
        this.sceneManager.scene.add(this.mesh);
    }

    public updatePosition() {
        this.mesh.position.x += this.move.x;
        this.mesh.position.y += this.move.y;
    }

    public isOutOfBound() {
        return this.mesh.position.x - this.size / 2 > this.sceneManager.camera.right ||
        this.mesh.position.x + this.size / 2 < this.sceneManager.camera.left ||
        this.mesh.position.y - this.size / 2 > this.sceneManager.camera.top ||
        this.mesh.position.y + this.size / 2 < this.sceneManager.camera.bottom
    }

    public isCollision(character: Character) {
        return isCollision(this.mesh, character.mesh)
    }
}



