import { Mob } from './Mob';
import { SceneManager } from './SceneManager';


export class Mobs {
    public sceneManager: SceneManager
    public items: Mob[]

    constructor(sceneManager: SceneManager) {
        this.sceneManager = sceneManager
        this.items = []
    }
}