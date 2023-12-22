import { getAIStrategy } from "./AI-strategies";
import { addScore } from "./score";

export default class AsteroidGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, amount) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Asteroid,
      key: "Asteroids",
      frame: "Asteroid 01 - Base",
      frameQuantity: amount,
      active: false,
      visible: false,
    });

    scene.anims.create({
      key: "destruction",
      frames: scene.anims.generateFrameNames("Asteroids", {
        prefix: "Asteroid 01 - Explode-",
        end: 6,
        zeroPad: 1,
      }),
      frameRate: 15,
      showOnStart: true,
    });
  }

  spawn(x, y, AIStrategy) {
    const asteroid = this.getFirstDead(false);
    asteroid.enableBody(true, x, y, true, true);
    asteroid.setAIStrategy(AIStrategy);
    asteroid.useAIStrategy();

    return asteroid;
  }
}

class Asteroid extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "Asteroids", "Asteroid 01 - Base");

    this.score = 2;
    this.health = 50;
    this.speed = 45;

    this.on(
      "animationcomplete",
      (e) => {
        if (e.key == "destruction") {
          this.reset();
        }
      },
      this
    );

    scene.physics.add.existing(this);
    this.body.setSize(this.frame.cutWidth, this.frame.cutHeight);
  }

  setAIStrategy(AIStrategy) {
    this.AIStrategy = AIStrategy;
  }

  useAIStrategy() {
    getAIStrategy(this.AIStrategy).use(this);
  }

  takeDamage(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      addScore(this.score);
      this.anims.play("destruction");
      this.body.checkCollision.none = true;
    }
  }

  flashColor(color, delay) {
    this.setTintFill(color);

    this.scene.time.delayedCall(delay, () => {
      this.clearTint();
    });
  }

  reset() {
    this.health = 25;
    this.disableBody(true, true);
    this.setTexture("Asteroids", "Asteroid 01 - Base");
    this.body.checkCollision.none = false;
  }
}
