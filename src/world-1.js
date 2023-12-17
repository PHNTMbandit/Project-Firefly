import BackgroundController from "./background-controller";
import PlayerController from "./player-controller";
import EnemyGroup from "./ships";
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

    this.enemies = new EnemyGroup(this, 10, getShip("Vaxtra Battlecruiser"));
    this.enemies.spawnShip(this.scale.width * 0.5, 50);

    this.physics.add.overlap(
      this.playerController.player.weapon.projectileGroup,
      this.enemies,
      this.enemies.takeDamage,
      null,
      this
    );

    this.physics.add.overlap(
      this.playerController.player.ship,
      this.enemies.projectileGroup,
      this.playerController.player.takeDamage,
      null,
      this
    );
  }

  update(time) {
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
