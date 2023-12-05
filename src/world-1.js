import Phaser from "phaser";
import { spawnShip } from "./ships";
import shipController from "./ship-controller";

let player;

export default class World1 extends Phaser.Scene {
  constructor() {
    super("world-1");
  }

  preload() {
    this.load.multiatlas(
      "ships",
      "public/sprites/ships.json",
      "public/sprites"
    );

    this.load.multiatlas(
      "projectiles",
      "public/sprites/projectiles.json",
      "public/sprites"
    );
  }

  create() {
    this.addInput();
    player = spawnShip(0, this, this.scale.width * 0.5, this.scale.height - 32);
  }

  update(time) {
    shipController.moveShip(player.sprite, player.ship.speed, this.cursors);
    shipController.shoot(
      player.sprite,
      player.ship.projectiles,
      this.keySpace,
      time
    );
  }

  addInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }
}
