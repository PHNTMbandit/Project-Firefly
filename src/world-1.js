import BackgroundController from "./background-controller";
import PlayerController from "./player-controller";
import WaveController from "./wave-controller";

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

    this.waveController = new WaveController(
      this,
      this.playerController.player
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
