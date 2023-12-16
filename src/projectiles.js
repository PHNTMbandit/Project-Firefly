export var getProjectile = function (name) {
  const projectiles = {
    "Auto Cannon Bullet": {
      projectileType: Projectile,
      damage: 5,
      fireRate: 200,
      speed: 350,
      spriteSheet: "projectiles",
      sprite: "Bullet/Main ship weapon - Projectile - Auto cannon bullet-0",
      frames: 3,
    },
    "Energy Ball": {
      projectileType: Projectile,
      damage: 10,
      speed: 350,
      spriteSheet: "projectiles",
      sprite: "Energy Ball/Main ship weapon - Projectile - Big Space Gun-0",
      frames: 9,
    },
    "Laser Beam": {
      projectileType: Projectile,
      damage: 10,
      spriteSheet: "projectiles",
      sprite: "Laser Beam/Main ship weapon - Projectile - Zapper-0",
      frames: 7,
    },
    Rocket: {
      projectileType: Projectile,
      damage: 5,
      fireRate: 600,
      speed: 350,
      spriteSheet: "projectiles",
      sprite: "Rocket/Main ship weapon - Projectile - Rocket-0",
      frames: 2,
    },
    "Vaxtra Bullet": {
      projectileType: Projectile,
      damage: 5,
      fireRate: 700,
      speed: 500,
      spriteSheet: "Kla'ed",
      sprite: "Projectiles/Bullet/Kla'ed - Bullet-0",
      frames: 7,
    },
    "Vaxtra Big Bullet": {
      projectileType: Projectile,
      damage: 5,
      fireRate: 700,
      speed: 500,
      spriteSheet: "Kla'ed",
      sprite: "Projectiles/Big Bullet/Kla'ed - Big Bullet-0",
      frames: 3,
    },
  };

  return projectiles[name];
};

export default class ProjectileGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, projectile, amount) {
    super(scene.physics.world, scene);

    this.projectile = projectile;

    this.createMultiple({
      classType: projectile.projectileType,
      key: projectile.spriteSheet,
      frame: projectile.sprite,
      frameQuantity: amount,
      active: false,
      visible: false,
    });

    scene.anims.create({
      key: `${projectile.sprite} shoot`,
      frames: scene.anims.generateFrameNames(projectile.spriteSheet, {
        prefix: projectile.sprite.slice(0, -1),
        end: projectile.frames,
        zeroPad: 1,
      }),
      frameRate: 15,
      repeat: -1,
      showOnStart: true,
    });
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
    projectile.data = this.projectile;
    this.scene.anims.play(`${projectile.data.sprite} shoot`, projectile);
    projectile.setScale(scale);
    projectile.enableBody(true, x, y, true, true);

    if (direction == "up") {
      projectile.setVelocityY(-this.projectile.speed);
    } else if (direction == "down") {
      projectile.setFlipY(true);
      projectile.setVelocityY(this.projectile.speed);
    }
  }

  dealDamage(target, projectile) {
    target.last.takeDamage(projectile.data.damage * projectile.scale);
    projectile.disableBody(true, true);
  }
}

class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteSheet, spriteName) {
    super(scene, x, y, spriteSheet, spriteName);

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

class Beam extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteSheet, spriteName) {
    super(scene, x, y, spriteSheet, spriteName);
  }
}
