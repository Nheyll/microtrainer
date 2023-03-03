import { Character } from './Character';
import { Projectile } from './Projectile';
import { SceneManager } from './SceneManager';


export class Projectiles {
    public sceneManager: SceneManager
    public items: Projectile[]

    constructor(sceneManager: SceneManager) {
        this.sceneManager = sceneManager
        this.items = []
    }

    public updateProjectilesPosition () {
        this.items.forEach((p, i) => {
            p.updatePosition()
            if(p.isOutOfBound()){
                this.removeProjectiles([i])
            }
        })
    }

    public removeProjectiles(indexes: number[]) {
        indexes.forEach(i => {
            this.sceneManager.removeMesh(this.items[i].mesh)
        }) 
        this.items = this.items.filter((_p,i) => !indexes.includes(i))
    };

    public checkCollisions(character: Character) {
        const indexes: number[] = []
        this.items.forEach((p, i) => {
            if(p.isCollision(character)) {
                indexes.push(i)
            }
        })
        this.removeProjectiles(indexes)
    }
}