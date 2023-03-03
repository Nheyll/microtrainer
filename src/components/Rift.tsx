import { Character } from "@/class/Character";
import { Mob } from "@/class/Mob";
import { SceneManager } from "@/class/SceneManager";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Vector2 } from "three";

export default function Rift() {
    const [sceneManager, setSceneManager] = useState<SceneManager|undefined>(undefined)
    const [character, setCharacter] = useState<Character|undefined>(undefined)
    const [isLoaded, setIsLoaded] = useState(false)

    function animate() {
        if(sceneManager && character) {
            character.updateMove()
            sceneManager.projectiles.updateProjectilesPosition()
            sceneManager.projectiles.checkCollisions(character)
            requestAnimationFrame(animate);
            sceneManager.renderer.render(sceneManager.scene, sceneManager.camera);
        }
    }

    useEffect(() => {
        const sceneManager = new SceneManager()
        const character = new Character(sceneManager)
        const mob = new Mob(sceneManager, new Vector2(200,200))
        mob.fireProjectile()
        sceneManager.mobs.items.push(mob)
        setSceneManager(sceneManager)
        setCharacter(character)
    }, [])

    useEffect(() => {
        if(character && sceneManager && !isLoaded) {
            animate();
            setIsLoaded(true)
        }
    }, [character, sceneManager])

    return (
        <Box onContextMenu={(e) => {
            e.preventDefault()
            return false
        }}>
            <canvas className="webgl"/>
        </Box>
    )
}