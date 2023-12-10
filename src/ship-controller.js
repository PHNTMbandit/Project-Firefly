export default class ShipController {
  static moveShip(ship, speed, cursors) {
    ship.setVelocity(0);

    if (cursors.left.isDown) {
      ship.setVelocityX(-speed);
      ship.anims.play("left", true);
    } else if (cursors.right.isDown) {
      ship.setVelocityX(speed);
      ship.anims.play("right", true);
    } else {
      ship.anims.play("straight", true);
    }

    if (cursors.up.isDown) {
      ship.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      ship.setVelocityY(speed);
    }
  }

  static shoot(ship, x, y, keySpace, time) {
    if (keySpace.isDown) {
      ship.shoot(x, y - 8, time);
    }
  }
}
