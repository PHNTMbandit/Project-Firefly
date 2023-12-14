export default function getProjectile(scene, name) {
  switch (name) {
    case "bullet":
      return new ProjectileGroup(scene, Bullet, 100);

    case "energy ball":
      return new ProjectileGroup(scene, EnergyBall, 100);

    case "laser beam":
      return new ProjectileGroup(scene, LaserBeam, 100);

    case "rocket":
      return new ProjectileGroup(scene, Rocket, 100);
  }
}

class ProjectileGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, projectile, amount) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: projectile,
      key: "projectiles",
      frameQuantity: amount,
      active: false,
      visible: false,
    });
  }

  getProjectile() {
    return this.getFirstDead(false);
  }

  dealDamage(target, projectile) {
    target.first.takeDamage(projectile.damage);
    projectile.disableBody(true, true);
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

    this.damage = 5;
    this.speed = 350;

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNames("projectiles", {
        prefix: "Bullet/Main ship weapon - Projectile - Auto cannon bullet-",
        end: 3,
        zeroPad: 1,
      }),
      frameRate: 15,
      repeat: -1,
      showOnStart: true,
    });

    scene.physics.add.existing(this);
    this.body.setSize(this.frame.width, this.frame.height, true);
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

class EnergyBall extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      "projectiles",
      "Energy Ball/Main ship weapon - Projectile - Big Space Gun-0"
    );

    this.damage = 10;
    this.speed = 350;

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNames("projectiles", {
        prefix: "Energy Ball/Main ship weapon - Projectile - Big Space Gun-",
        end: 9,
        zeroPad: 1,
      }),
      frameRate: 15,
      repeat: -1,
      showOnStart: true,
    });

    scene.physics.add.existing(this);
    this.body.setSize(this.frame.width, this.frame.height, true);
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

class LaserBeam extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      "projectiles",
      "Laser Beam/Main ship weapon - Projectile - Zapper-0"
    );

    this.damage = 5;

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNames("projectiles", {
        prefix: "Laser Beam/Main ship weapon - Projectile - Zapper-",
        end: 7,
        zeroPad: 1,
      }),
      frameRate: 15,
    });
  }

  shoot(x, y) {
    this.anims.play("shoot", true);
    this.enableBody(true, x, y, true, true);
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

    this.damage = 15;
    this.speed = 350;

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNames("projectiles", {
        prefix: "Rocket/Main ship weapon - Projectile - Rocket-",
        end: 2,
        zeroPad: 1,
      }),
      frameRate: 15,
    });

    scene.physics.add.existing(this);
    this.body.setSize(this.frame.width, this.frame.height, true);
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
