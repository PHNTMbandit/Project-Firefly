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

  shoot(ship, time) {
    this.weapon.use(ship, time);
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
      frameRate: this.fireRate / 3,
    });

    this.anims.create({
      key: "idle",
      frames: [
        {
          key: "weapons",
          frame: "auto-cannons/Main Ship - Weapons - Auto Cannon-0",
        },
      ],
      frameRate: 1,
    });

    this.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE,
      function () {
        this.anims.play("idle");
      },
      this
    );

    this.scene.add.existing(this);
  }

  use(ship, time) {
    if (time > this.fireElapsedTime) {
      this.fireElapsedTime = time + this.fireRate;

      this.anims.play("use");
      this.projectileGroup.shoot(ship.x + 6, ship.y, time);
      this.projectileGroup.shoot(ship.x + 26, ship.y, time);
    }
  }
}
