import Ship from "./ships";

export default class PlayerController {
  constructor(scene, x, y) {
    this.player = new Ship(scene, x, y, "Main Ship - Base - Full health.png");
    this.speed = 100;
  }
  moveShip(cursors) {
    this.player.body.velocity.scale(0.75);

    if (cursors.left.isDown) {
      this.player.setVelocityX(-this.speed);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(this.speed);
    }

    if (cursors.up.isDown) {
      this.player.setVelocityY(-this.speed);
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(this.speed);
    }
  }

  shoot(ship, x, y, keySpace, time) {
    if (keySpace.isDown) {
      ship.shoot(x, y - 8, time);
    }
  }
}
