export default function getProjectile(scene, name) {
  switch (name) {
    case "bullet":
      return new BulletGroup(scene);

    case "laser beam":
      return new LaserBeamGroup(scene);
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

    this.speed = 350;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y <= 0) {
      this.disableBody(true, true);
    }
  }

  shoot(x, y) {
    this.anims.play("shoot");
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(-this.speed);
  }
}

class BulletGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Bullet,
      key: "projectiles",
      frame: "Bullet/Main ship weapon - Projectile - Auto cannon bullet-0",
      frameQuantity: 100,
      active: false,
      visible: false,
    });
  }

  getProjectile() {
    return this.getFirstDead(false);
  }
}

class LaserBeam extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      "projectiles",
      "Laser Beam/Main ship weapon - Projectile - Zapper-0"
    );

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNames("projectiles", {
        prefix: "Laser Beam/Main ship weapon - Projectile - Zapper-",
        end: 7,
        zeroPad: 1,
      }),
      frameRate: 10,
    });

    scene.add.tileSprite(
      x,
      y,
      500,
      0,
      "projectiles",
      "Laser Beam/Main ship weapon - Projectile - Zapper-0"
    );
  }

  shoot(x, y) {
    this.anims.play("shoot", true);
    this.enableBody(true, x, y, true, true);
  }
}

class LaserBeamGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: LaserBeam,
      key: "projectiles",
      frame: "Laser Beam/Main ship weapon - Projectile - Zapper-0",
      frameQuantity: 6,
      active: false,
      visible: false,
    });
  }

  getProjectile(index) {
    return this.children.getArray().at(index);
  }
}
