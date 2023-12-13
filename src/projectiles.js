export default function getProjectile(scene, name) {
  switch (name) {
    case "bullet":
      return new BulletGroup(scene);

    case "energy ball":
      return new EnergyBallGroup(scene);

    case "laser beam":
      return new LaserBeamGroup(scene);

    case "rocket":
      return new RocketGroup(scene);
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

    this.speed = 350;

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

class EnergyBall extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      "projectiles",
      "Energy Ball/Main ship weapon - Projectile - Big Space Gun-0"
    );

    this.speed = 350;

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNames("projectiles", {
        prefix: "Energy Ball/Main ship weapon - Projectile - Big Space Gun-",
        end: 9,
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

  shoot(x, y) {
    this.anims.play("shoot");
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(-this.speed);
  }
}

class EnergyBallGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: EnergyBall,
      key: "projectiles",
      frame: "Energy Ball/Main ship weapon - Projectile - Big Space Gun-0",
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
      "setScale.y": 1,
      //  "setOrigin.y": 0.95,
    });
  }

  getProjectile(index) {
    return this.children.getArray().at(index);
  }
}

class Rocket extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      "projectiles",
      "Rocket/Main ship weapon - Projectile - Rocket-0"
    );
    this.speed = 350;

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNames("projectiles", {
        prefix: "Rocket/Main ship weapon - Projectile - Rocket-",
        end: 2,
        zeroPad: 1,
      }),
      frameRate: 10,
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y <= 0) {
      this.disableBody(true, true);
    }
  }

  shoot(x, y) {
    this.anims.play("shoot", true);
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(-this.speed);
  }
}

class RocketGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Rocket,
      key: "projectiles",
      frame: "Rocket/Main ship weapon - Projectile - Rocket-0",
      frameQuantity: 100,
      active: false,
      visible: false,
    });
  }

  getProjectile() {
    return this.getFirstDead(false);
  }
}
