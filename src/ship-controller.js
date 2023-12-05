export default class ShipController {
  static moveShip(ship, speed, cursors) {
    ship.setVelocity(0);

    if (cursors.left.isDown) {
      ship.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
      ship.setVelocityX(speed);
    }
    if (cursors.up.isDown) {
      ship.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      ship.setVelocityY(speed);
    }
  }

  static shoot(ship, keySpace, time) {
    if (keySpace.isDown) {
      ship.projectileGroup.shootProjectile(ship.x, ship.y - 8, time);
    }
  }
}
