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
      "/sprites/backgrounds.json",
      "/sprites"
    );

    this.load.multiatlas("Kla'ed", "/sprites/kla'ed.json", "/sprites");

    this.load.multiatlas("Planet", "/sprites/planet.json", "/sprites");

    this.load.multiatlas(
      "player-ship",
      "/sprites/player-ship.json",
      "/sprites"
    );

    this.load.multiatlas(
      "projectiles",
      "/sprites/projectiles.json",
      "/sprites"
    );

    this.load.multiatlas("weapons", "/sprites/weapons.json", "/sprites");
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
    this.enemy = this.enemies.spawnShip(this.scale.width * 0.5, 50);

    this.physics.add.overlap(
      this.enemies,
      this.playerController.player.weapon.projectileGroup,
      this.playerController.player.weapon.projectileGroup.dealDamage,
      null,
      this
    );

    this.physics.add.overlap(
      this.playerController.player.ship,
      this.enemies.projectileGroup,
      this.enemies.projectileGroup.dealDamage,
      null,
      this
    );
  }

  update(time) {
    if (this.enemy.active) {
      this.enemies.shoot(this.enemy, time, this.enemy.x, this.enemy.y + 13);
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
