import Phaser from "phaser";
import Ship from "./ship.js";

let player;
let keySpace;

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
  }

  create() {
    this.addInput();

    player = new Ship(
      this,
      this.scale.width * 0.5,
      this.scale.height - 32,
      "8x8/SpaceShooterAssetPack_Ships-1.png"
    );
  }

  update(time, delta) {
    player.move(this.cursors, keySpace, time);
  }

  addInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }
}
