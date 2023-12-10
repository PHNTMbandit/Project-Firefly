import ShipGroup from "./ships";
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
    this.background = this.add
      .tileSprite(
        0,
        0,
        1920,
        1080,
        "backgrounds",
        "SpaceShooterAssetPack_BackGrounds-0.png"
      )
      .setScrollFactor(0.2, 0.2);

    this.background1 = this.add
      .tileSprite(
        0,
        0,
        1920,
        1080,
        "backgrounds",
        "SpaceShooterAssetPack_BackGrounds-5.png"
      )
      .setScrollFactor(0.6, 0.6);

    this.background2 = this.add
      .tileSprite(
        50,
        50,
        1920,
        1080,
        "backgrounds",
        "SpaceShooterAssetPack_BackGrounds-5.png"
      )
      .setScrollFactor(0.9, 0.9);

    this.playerShip = new ShipGroup(this, "Proto");
    this.enemyShips = new ShipGroup(this, "Proto");

    this.player = this.playerShip.spawnShip(
      this.scale.width * 0.5,
      this.scale.height - 32
    );

    this.enemy = this.enemyShips.spawnShip(
      this.scale.width * 0.5,
      this.scale.height - 150
    );

    this.physics.add.overlap(
      this.enemy,
      this.playerShip.projectileGroup,
      this.enemyShips.damage,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.enemyShips.projectileGroup,
      this.playerShip.damage,
      null,
      this
    );

    this.addInput();
  }

  update(time) {
    this.background.tilePositionY -= 0.1;
    this.background1.tilePositionY -= 0.6;
    this.background2.tilePositionY -= 0.9;

    shipController.moveShip(this.player, this.player.data.speed, this.cursors);
    shipController.shoot(
      this.playerShip,
      this.player.x,
      this.player.y,
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
