import './style/main.css';
import { initCharacter, updateCharacter } from './js/character';
import { renderer, scene, camera } from './js/sceneManager';
import { Mob } from './js/Mob';
import { updateProjectiles } from './js/Projectile';

initCharacter();
const mob = new Mob();
mob.spawn(100, 100);
mob.fireProjectile();

// Rendered loop
function animate() {
    updateCharacter();
    updateProjectiles();
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();