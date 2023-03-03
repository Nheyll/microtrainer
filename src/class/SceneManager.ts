import * as THREE from 'three';
import { Mobs } from './Mobs';
import { Projectiles } from './Projectiles';

export class SceneManager {
    public scene: THREE.Scene;
    public camera: THREE.OrthographicCamera;
    public renderer: THREE.WebGLRenderer;
    public windowWidth: number;
    public windowHeight: number;
    public projectiles: Projectiles
    public mobs: Mobs

    constructor() {
        this.scene = new THREE.Scene();

        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        this.camera = new THREE.OrthographicCamera(
            -this.windowWidth / 2, this.windowWidth / 2, this.windowHeight / 2, -this.windowHeight / 2, 1, 1000
        );
        this.camera.position.z = 1000;

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('.webgl') as Element
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.windowWidth, this.windowHeight);

        this.projectiles = new Projectiles(this)
        this.mobs = new Mobs(this)

        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(this.windowWidth, this.windowHeight);

            this.camera.left = -this.windowWidth / 2;
            this.camera.right = this.windowWidth / 2;
            this.camera.top = this.windowHeight / 2;
            this.camera.bottom = -this.windowHeight / 2;
            this.camera.updateProjectionMatrix();
        });
    }

    public removeMesh(mesh: THREE.Mesh | undefined) {
        if (!mesh) return
        this.scene.remove(mesh);
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
            mesh.material.forEach(m => m.dispose())
        } else {
            mesh.material.dispose();
        }
        mesh = undefined;
    }
}
