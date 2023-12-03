import LaserGroup from "./lasers/laser-group.js";
import { PlayerStats } from "./player-stats.js";

let ship;
let laserGroup;

export default class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, shipName) {
    super(scene, x, y, shipName);

    ship = scene.physics.add.sprite(x, y, "ships", shipName);
    ship.setCollideWorldBounds(true);
    laserGroup = new LaserGroup(scene);
  }

  move(cursors, keySpace, time) {
    ship.setVelocity(0);

    if (cursors.left.isDown) {
      ship.setVelocityX(-PlayerStats.speed);
    } else if (cursors.right.isDown) {
      ship.setVelocityX(PlayerStats.speed);
    }
    if (cursors.up.isDown) {
      ship.setVelocityY(-PlayerStats.speed);
    } else if (cursors.down.isDown) {
      ship.setVelocityY(PlayerStats.speed);
    }
    if (keySpace.isDown) {
      this.shoot(time);
    }
  }

  shoot(time) {
    laserGroup.fireLaser(ship.x, ship.y - 20, time);
  }
}
