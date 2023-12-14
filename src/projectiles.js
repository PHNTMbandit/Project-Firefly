var projectileData = function getProjectileData(name) {
  const projectileData = {
    AutoCannonBullet: {
      damage: 5,
      fireRate: 200,
      speed: 350,
    },
    EnergyBall: {
      damage: 10,
      speed: 350,
    },
    LaserBeam: {
      damage: 10,
    },
    Rocket: {
      damage: 5,
      fireRate: 600,
      speed: 350,
    },
    VaxtraBullet: {
      damage: 5,
      fireRate: 200,
      speed: 500,
    },
  };

  return projectileData[name];
};

export default function getProjectileGroup(scene, name) {
  switch (name) {
    case "Auto Cannon Bullet":
      return new ProjectileGroup(scene, AutoCannonBullet, "projectiles", 100);

    case "Energy Ball":
      return new ProjectileGroup(scene, EnergyBall, "projectiles", 100);

    case "Laser Beam":
      return new ProjectileGroup(scene, LaserBeam, "projectiles", 100);

    case "Rocket":
      return new ProjectileGroup(scene, Rocket, "projectiles", 100);

    case "Vaxtra Bullet":
      return new ProjectileGroup(scene, VaxtraBullet, "Kla'ed", 100);
  }
}

class ProjectileGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, projectile, spriteSheet, amount) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: projectile,
      key: spriteSheet,
      frameQuantity: amount,
      active: false,
      visible: false,
    });

    this.projectile = projectile;
    this.projectileData = projectileData(projectile.name);
  }

  getProjectile(index) {
    if (index != null) {
      return this.children.getArray().at(index);
    } else {
      return this.getFirstDead(false);
    }
  }

  shootProjectile(x, y, direction, scale) {
    const projectile = this.getFirstDead(false);
    projectile.setScale(scale);
    projectile.anims.play("shoot");
    projectile.enableBody(true, x, y, true, true);

    if (direction == "up") {
      projectile.setVelocityY(-this.projectileData.speed);
    } else if (direction == "down") {
      projectile.setFlipY(true);
      projectile.setVelocityY(this.projectileData.speed);
    }
  }

  dealDamage(target, projectile) {
    target.first.takeDamage(
      projectileData(projectile.constructor.name).damage * projectile.scale
    );
    projectile.disableBody(true, true);
  }
}

class AutoCannonBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "projectiles");

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
}

class EnergyBall extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "projectiles");

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
}

class LaserBeam extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "projectiles");

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
}

class Rocket extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "projectiles");

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNames("projectiles", {
        prefix: "Rocket/Main ship weapon - Projectile - Rocket-",
        end: 2,
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
}

class VaxtraBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "Kla'ed");

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNames("Kla'ed", {
        prefix: "Projectiles/Bullet/Kla'ed - Bullet-",
        end: 7,
        zeroPad: 1,
      }),
      frameRate: 15,
      repeat: -1,
      showOnStart: true,
    });

    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.body.setSize(this.frame.width, this.frame.height, true);
    this.body.world.on("worldbounds", () => {
      console.log("hi");
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y <= 0 || this.y >= this.scene.scale.height + 50) {
      this.disableBody(true, true);
    }
  }
}
