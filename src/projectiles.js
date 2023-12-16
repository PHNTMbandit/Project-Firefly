export var getProjectile = function (name) {
  const projectiles = {
    "Auto Cannon Bullet": {
      class: AutoCannonBullet,
      damage: 5,
      fireRate: 200,
      speed: 350,
      spriteSheet: "projectiles",
    },
    "Energy Ball": {
      class: EnergyBall,
      damage: 10,
      speed: 350,
      spriteSheet: "projectiles",
    },
    "Laser Beam": {
      class: LaserBeam,
      damage: 10,
      spriteSheet: "projectiles",
    },
    Rocket: {
      class: Rocket,
      damage: 5,
      fireRate: 600,
      speed: 350,
      spriteSheet: "projectiles",
    },
    "Vaxtra Bullet": {
      class: VaxtraBullet,
      damage: 5,
      fireRate: 700,
      speed: 500,
      spriteSheet: "Kla'ed",
    },
  };

  return projectiles[name];
};

export default class ProjectileGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, projectile, amount) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: projectile.class,
      key: projectile.spriteSheet,
      frameQuantity: amount,
      active: false,
      visible: false,
    });

    this.projectile = projectile;
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
      projectile.setVelocityY(-this.projectile.speed);
    } else if (direction == "down") {
      projectile.setFlipY(true);
      projectile.setVelocityY(this.projectile.speed);
    }
  }

  dealDamage(target, projectile) {
    const projectileName = projectile.constructor.name.replace(
      /([a-z])([A-Z])/g,
      "$1 $2"
    );

    target.last.takeDamage(
      getProjectile(projectileName).damage * projectile.scale
    );
    projectile.disableBody(true, true);
  }
}

class AutoCannonBullet extends Phaser.Physics.Arcade.Sprite {
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
      frameRate: 15,
      repeat: -1,
      showOnStart: true,
    });

    scene.physics.add.existing(this);
    this.body.setSize(this.frame.cutWidth, this.frame.cutHeight);
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
    super(
      scene,
      x,
      y,
      "projectiles",
      "Energy Ball/Main ship weapon - Projectile - Big Space Gun-0"
    );

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
    this.body.setSize(this.frame.cutWidth, this.frame.cutHeight);
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
      frameRate: 15,
    });
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
    this.body.setSize(this.frame.cutWidth, this.frame.cutHeight);
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
    super(scene, x, y, "Kla'ed", "Projectiles/Bullet/Kla'ed - Bullet-0");

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
    this.body.setSize(this.frame.cutWidth, this.frame.cutHeight);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y <= 0 || this.y >= this.scene.scale.height + 50) {
      this.disableBody(true, true);
    }
  }
}
