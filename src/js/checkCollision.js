import { projectiles, removeProjectile } from './Projectile';
import { character } from './character';

export const checkCollisions = function() {
    var i = projectiles.length;
    while (i--) {
        if (isCollision(character, projectiles[i].projectileMesh)) {
            removeProjectile(projectiles[i], i);
        }
    }
};

// You have to pass the Mesh object
function isCollision(object1, object2) {
    
    let minX1 = object1.position.x - (object1.geometry.parameters.width/2);
    let maxX1 = object1.position.x + (object1.geometry.parameters.width/2);
    let minY1 = object1.position.y - (object1.geometry.parameters.height/2);
    let maxY1 = object1.position.y + (object1.geometry.parameters.height/2);

    let minX2 = object2.position.x - (object2.geometry.parameters.width/2);
    let maxX2 = object2.position.x + (object2.geometry.parameters.width/2);
    let minY2 = object2.position.y - (object2.geometry.parameters.height/2);
    let maxY2 = object2.position.y + (object2.geometry.parameters.height/2);

    if (minX1 <= maxX2 && maxX1 >= minX2 && minY1 <= maxY2 && maxY1 >= minY2)
        return true;
    else
        return false;

} 