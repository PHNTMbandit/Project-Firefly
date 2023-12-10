var getProjectileType = function (projectileTypeName) {
  const types = {
    laser: {
      sprite: "SpaceShooterAssetPack_Projectiles-4.png",
      damage: 10,
      speed: 200,
      fireRate: 100,
      scale: 1,
    },
  };

  return types[projectileTypeName];
};

export default class ProjectileGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, projectileTypeName) {
    super(scene.physics.world, scene);

    this.projectileType = getProjectileType(projectileTypeName);
    this.fireElapsedTime = 0;

    this.group = this.projectiles = this.createMultiple({
      key: "projectiles",
      frame: this.projectileType.sprite,
      frameQuantity: 100,
      active: false,
      visible: false,
      "setScale.x": this.projectileType.scale,
      "setScale.y": this.projectileType.scale,
    });

    this.group.forEach((projectile) => (projectile.data = this.projectileType));
  }

  // preUpdate(time, delta) {
  //   super.preUpdate(time, delta);

  //   if (this.group.forEach(projectile)this.y <= 0) {
  //     this.disableBody(true, true);
  //   }
  // }

  shootProjectile(x, y, time) {
    const projectile = this.getFirstDead(false);

    if (projectile && time > this.fireElapsedTime) {
      this.fireElapsedTime = time + projectile.data.fireRate;

      projectile.enableBody(true, x, y, true, true);
      projectile.setVelocityY(-projectile.data.speed);
    }
  }
}
