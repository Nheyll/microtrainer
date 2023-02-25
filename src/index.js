import './style/main.css';
import { initCharacter, updateCharacter } from './js/character';
import { renderer, scene, camera } from './js/sceneManager';
import { Mob } from './js/Mob';
import { updateProjectilesPosition } from './js/Projectile';
import { checkCollisions } from './js/checkCollision';

initCharacter();
const mob = new Mob();
mob.spawn(100, 100);
mob.fireProjectile();

// Rendered loop
function animate() {
    updateCharacter();
    updateProjectilesPosition();
    checkCollisions();
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();