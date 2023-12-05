export var getProjectileGroup = function (projectileTypeName, scene) {
  const projectileGroup = {
    laser: {
      sprite: "SpaceShooterAssetPack_Projectiles-0.png",
      fireRate: 100,
      amount: 100,
      scale: 1,
    },
  };

  return {
    projectile: projectileGroup[projectileTypeName],
    group: new ProjectileGroup(
      scene,
      projectileGroup[projectileTypeName].sprite,
      projectileGroup[projectileTypeName].fireRate,
      projectileGroup[projectileTypeName].amount,
      projectileGroup[projectileTypeName].scale
    ),
  };
};

class ProjectileGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, sprite, fireRate, amount, scale) {
    super(scene.physics.world, scene);

    this.sprite = sprite;
    this.fireRate = fireRate;
    this.fireElapsedTime = 0;

    this.projectiles = this.createMultiple({
      classType: Projectile,
      key: "projectiles",
      frame: sprite,
      frameQuantity: amount,
      active: false,
      visible: false,
      "setScale.x": scale,
      "setScale.y": scale,
    });

    this.projectiles.forEach((projectile) => projectile.setFrame(this.sprite));
  }

  shootProjectile(x, y, time) {
    const projectile = this.getFirstDead(false);

    if (projectile && time > this.fireElapsedTime) {
      this.fireElapsedTime = time + this.fireRate;
      projectile.shoot(x, y);
    }
  }
}

class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "projectiles");
  }

  shoot(x, y) {
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(-100);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y <= 0) {
      this.disableBody(true, true);
    }
  }
}
