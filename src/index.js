import './style/main.css'
import { initCharacter, updateCharacter } from './js/character';
import { renderer, scene, camera } from './js/sceneManager'

initCharacter();

// Rendered loop
function animate() {
  updateCharacter();
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
animate();







