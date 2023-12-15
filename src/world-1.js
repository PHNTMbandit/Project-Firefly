import BackgroundController from "./background-controller";
import PlayerController from "./player-controller";
import { getShip } from "./ships";

export default class World1 extends Phaser.Scene {
  constructor() {
    super("world-1");
  }

  preload() {
    this.load.multiatlas(
      "Backgrounds",
      "public/sprites/backgrounds.json",
      "public/sprites"
    );

    this.load.multiatlas(
      "Kla'ed",
      "public/sprites/kla'ed.json",
      "public/sprites"
    );

    this.load.multiatlas(
      "Planet",
      "public/sprites/planet.json",
      "public/sprites"
    );

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
    this.backgroundController = new BackgroundController(this);

    this.playerController = new PlayerController(
      this,
      this.scale.width * 0.5,
      this.scale.height - 32
    );

    this.enemy = getShip("Vaxtra Scout")
      .spawnShip(this, this.scale.width * 0.5, 50)
      .setFlipY(true);

    this.physics.add.overlap(
      this.enemy.ship,
      this.playerController.player.weapon.projectileGroup,
      this.playerController.player.weapon.projectileGroup.dealDamage,
      null,
      this
    );

    this.physics.add.overlap(
      this.playerController.player.ship,
      this.enemy.projectileGroup,
      this.enemy.projectileGroup.dealDamage,
      null,
      this
    );
  }

  update(time) {
    if (this.enemy.active) {
      this.enemy.shoot(time, this.enemy.ship.x, this.enemy.ship.y + 13);
    }
    this.backgroundController.updateBackgrounds();
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
