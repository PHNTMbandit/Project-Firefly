import spawnShip from "./ships";
import shipController from "./ship-controller";

export default class World1 extends Phaser.Scene {
  constructor() {
    super("world-1");
  }

  preload() {
    this.load.multiatlas(
      "backgrounds",
      "public/sprites/backgrounds.json",
      "public/sprites"
    );

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

    this.background = this.add.tileSprite(
      0,
      0,
      1920,
      1080,
      "backgrounds",
      "SpaceShooterAssetPack_BackGrounds-0.png"
    );

    this.background1 = this.add.tileSprite(
      0,
      0,
      1920,
      1080,
      "backgrounds",
      "SpaceShooterAssetPack_BackGrounds-5.png"
    );

    this.player = spawnShip(
      "Proto",
      this,
      this.scale.width * 0.5,
      this.scale.height - 32
    );

    this.enemy = spawnShip(
      "Proto",
      this,
      this.scale.width * 0.5,
      this.scale.height - 150
    );

    this.physics.add.overlap(
      this.enemy,
      this.player.projectileGroup,
      this.player.projectileGroup.damageTarget,
      null,
      this
    );
  }

  update(time) {
    shipController.moveShip(this.player, this.player.speed, this.cursors);
    shipController.shoot(this.player, this.keySpace, time);

    this.background.tilePositionY -= 0.1;
    this.background1.tilePositionY -= 0.4;
  }

  addInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }
}
