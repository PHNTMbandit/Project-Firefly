import getProjectile from "./projectiles";

export default class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene,
    x,
    y,
    spriteSheet,
    name,
    collidesWithWorld,
    health,
    speed
  ) {
    super(scene, 0, 0, spriteSheet, name);

    this.weapon = new AutoCannon(scene, 0, 0);
    this.speed = speed;
    this.health = health;

    const container = scene.add.container(x, y, [this.weapon, this]);
    container.setSize(32, 32);
    this.physics = scene.physics.add.existing(container);
    this.physics.body.setCollideWorldBounds(collidesWithWorld);
  }

  moveX(x) {
    this.physics.body.velocity.x = x;
  }

  moveY(y) {
    this.physics.body.velocity.y = y;
  }

  shoot(x, y, time) {
    this.weapon.use(x, y, time);
  }
}

class AutoCannon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      "weapons",
      "auto-cannons/Main Ship - Weapons - Auto Cannon-0"
    );

    this.fireRate = 150;
    this.fireElapsedTime = 0;
    this.projectileGroup = getProjectile(scene, "Bullet");

    this.anims.create({
      key: "use",
      frames: this.anims.generateFrameNames("weapons", {
        prefix: "auto-cannons/Main Ship - Weapons - Auto Cannon-",
        end: 6,
        zeroPad: 1,
      }),
      frameRate: 50,
    });

    this.scene.add.existing(this);
  }

  use(x, y, time) {
    if (time > this.fireElapsedTime) {
      this.fireElapsedTime = time + this.fireRate;

      this.anims.play("use");
      this.projectileGroup.shoot(x, y, time);
    }
  }
}
