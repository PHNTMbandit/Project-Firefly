export default function getProjectile(scene, name) {
  switch (name) {
    case "Bullet":
      return new BulletGroup(scene);
  }
}

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      "projectiles",
      "Bullet/Main ship weapon - Projectile - Auto cannon bullet-0"
    );

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNames("projectiles", {
        prefix: "Bullet/Main ship weapon - Projectile - Auto cannon bullet-",
        end: 3,
        zeroPad: 1,
      }),
      frameRate: 10,
      repeat: -1,
      showOnStart: true,
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y <= 0) {
      this.disableBody(true, true);
    }
  }

  shoot(x, y, speed) {
    this.anims.play("shoot");
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(-speed);
  }
}

class BulletGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.speed = 300;

    this.createMultiple({
      classType: Bullet,
      key: "projectiles",
      frame: "Bullet/Main ship weapon - Projectile - Auto cannon bullet-0",
      frameQuantity: 100,
      active: false,
      visible: false,
    });
  }

  shoot(x, y, time) {
    const projectile = this.getFirstDead(false);

    if (projectile) {
      projectile.shoot(x, y, this.speed);
    }
  }
}
