import Phaser from "phaser";
import LaserGroup from "./lasers/laser-group.js";
import { PlayerStats } from "./player-stats.js";

export default class World1 extends Phaser.Scene {
  constructor() {
    super("world-1");

    this.player;
    this.keySpace;
    this.laserGroup;
  }

  preload() {
    this.load.multiatlas(
      "ships",
      "public/sprites/ships.json",
      "public/sprites"
    );
  }

  create() {
    this.addInput();
    this.addShip();
    this.laserGroup = new LaserGroup(this);
  }

  update(time, delta) {
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-PlayerStats.speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(PlayerStats.speed);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-PlayerStats.speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(PlayerStats.speed);
    }

    if (this.keySpace.isDown) {
      this.shoot(time);
    }
  }

  addInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  addShip() {
    this.player = this.physics.add.sprite(
      this.scale.width * 0.5,
      this.scale.height - 32,
      "ships",
      "8x8/SpaceShooterAssetPack_Ships-1.png"
    );

    this.player.setCollideWorldBounds(true);
  }

  shoot(time) {
    this.laserGroup.fireLaser(this.player.x, this.player.y - 20, time);
  }
}
