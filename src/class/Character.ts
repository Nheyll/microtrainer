import { Direction } from "@/utils/enums"
import * as THREE from "three"
import { SceneManager } from "./SceneManager"

const DEFAULT_MOVE_SPEED = 5;

export class Character {
    public sceneManager: SceneManager
    public move: THREE.Vector2
    public current: THREE.Vector2
    public target: THREE.Vector2
    public moveDirection: string
    public moveSpeed: number
    public mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>

    constructor(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
        let treee = new THREE.Vector2(0, 0);
        this.move = treee
        this.current = new THREE.Vector2(0, 0);
        this.target = new THREE.Vector2(0, 0);
        this.moveDirection = Direction.NOT_MOVING;
        this.moveSpeed = DEFAULT_MOVE_SPEED
        const geometry = new THREE.PlaneGeometry( 100, 100, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } );
        this.mesh = new THREE.Mesh( geometry, material );
        this.sceneManager.scene.add( this.mesh );
        window.addEventListener('contextmenu', (event) => {
            this.onMove(event);
        });
    }

    public onMove(event: MouseEvent) {
        this.target.set(event.clientX - this.sceneManager.windowWidth/2, -event.clientY + this.sceneManager.windowHeight/2);
        this.setDirection();
        let dist = new THREE.Vector2(this.mesh.position.x-this.target.x, this.mesh.position.y-this.target.y);
        if(dist.x != 0 && dist.y != 0) {
            let ratio = Math.abs(dist.x/dist.y);
            this.move.setX(ratio / (1 + ratio) * this.moveSpeed);
            this.move.setY(this.moveSpeed - this.move.x);
        } else if (dist.x == 0 && dist.y != 0) {
            this.move.set(0, this.moveSpeed);
        } else if (dist.x != 0 && dist.y == 0) {
            this.move.set(this.moveSpeed, 0);
        } else {
            this.move.set(0, 0);
        }
        if(dist.x > 0)
        this.move.setX(-this.move.x);
        if(dist.y > 0)
        this.move.setY(-this.move.y);
    }

    public setDirection() {
        if(this.target.x > this.current.x){
            if(this.target.y > this.current.y) {
                this.moveDirection = Direction.NE;
            }else{
                this.moveDirection = Direction.SE;
            }
        } else {
            if(this.target.y > this.current.y) {
                this.moveDirection = Direction.NW;
            }else{
                this.moveDirection = Direction.SW;
            }
        }
    }

    public updateMove() {
        if (this.moveDirection == Direction.NE && (this.current.x+this.move.x > this.target.x || this.current.y+this.move.y > this.target.y)){
            this.moveDirection = Direction.NOT_MOVING;
        } else if (this.moveDirection == Direction.NW && (this.current.x+this.move.x < this.target.x || this.current.y+this.move.y > this.target.y)){
            this.moveDirection = Direction.NOT_MOVING;
        } else if (this.moveDirection == Direction.SE && (this.current.x+this.move.x > this.target.x || this.current.y+this.move.y < this.target.y)){
            this.moveDirection = Direction.NOT_MOVING;
        } else if (this.moveDirection == Direction.SW && (this.current.x+this.move.x < this.target.x || this.current.y+this.move.y < this.target.y)){
            this.moveDirection = Direction.NOT_MOVING;
        }
    
        if(this.moveDirection != Direction.NOT_MOVING){
            this.current.set(this.current.x + this.move.x, this.current.y + this.move.y);
            this.mesh.position.x = this.current.x;
            this.mesh.position.y = this.current.y;
        } else {
            this.mesh.position.x = this.target.x;
            this.mesh.position.y = this.target.y;
            this.current.set(this.target.x, this.target.y);
        }
    }
}