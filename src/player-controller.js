import Ship from "./ships";

export default class PlayerController {
  constructor(scene, x, y) {
    this.player = new Ship(
      scene,
      x,
      y,
      "player-ship",
      "Main Ship - Base - Full health.png",
      true,
      100,
      100
    );
  }
  moveShip(cursors) {
    this.player.physics.body.velocity.scale(0.75);

    if (cursors.left.isDown) {
      this.player.moveX(-this.player.speed);
    } else if (cursors.right.isDown) {
      this.player.moveX(this.player.speed);
    }

    if (cursors.up.isDown) {
      this.player.moveY(-this.player.speed);
    } else if (cursors.down.isDown) {
      this.player.moveY(this.player.speed);
    }
  }

  shoot(ship, x, y, keySpace, time) {
    if (keySpace.isDown) {
      ship.shoot(x, y - 8, time);
    }
  }
}
