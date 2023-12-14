import getShip from "./ships";
import PlayerController from "./player-controller";

export default class World1 extends Phaser.Scene {
  constructor() {
    super("world-1");
  }

  preload() {
    this.load.multiatlas(
      "player-ship",
      "public/sprites/player-ship.json",
      "public/sprites"
    );

    this.load.multiatlas(
      "projectiles",
      "public/sprites/projectiles.json",
      "public/sprites"
    );

    this.load.multiatlas(
      "weapons",
      "public/sprites/weapons.json",
      "public/sprites"
    );
  }

  create() {
    this.addInput();
    this.playerController = new PlayerController(
      this,
      this.scale.width * 0.5,
      this.scale.height - 32
    );

    this.enemy = getShip(this, this.scale.width * 0.5, +50, "player");

    this.physics.add.overlap(
      this.enemy.physics,
      this.playerController.player.weapon.projectileGroup,
      this.playerController.player.weapon.projectileGroup.dealDamage,
      null,
      this
    );
  }

  update(time) {
    this.playerController.moveShip(this.cursors);
    this.playerController.shoot(this.keySpace, time);
  }

  addInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }
}
