import { getProjectile } from "./projectiles";
import ProjectileGroup from "./projectiles";

export var getWeapon = function (name) {
  const weapons = {
    "Auto Cannon": {
      projectile: "Auto Cannon Bullet",
      spawnWeapon(scene, ship) {
        return new AutoCannon(scene, ship, getProjectile(this.projectile));
      },
    },
    "Big Space Gun": {
      projectile: "Energy Ball",
      spawnWeapon(scene, ship) {
        return new BigSpaceGun(scene, ship, getProjectile(this.projectile));
      },
    },
    Rockets: {
      projectile: "Rocket",
      spawnWeapon(scene, ship) {
        return new Rockets(scene, ship, getProjectile(this.projectile));
      },
    },
    Zapper: {
      projectile: "Laser Beam",
      spawnWeapon(scene, ship) {
        return new Zapper(scene, ship, getProjectile(this.projectile));
      },
    },
  };

  return weapons[name];
};

class AutoCannon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, user, projectile) {
    super(
      scene,
      user.x,
      user.y,
      "weapons",
      "Auto Cannon/Main Ship - Weapons - Auto Cannon-0"
    );

    this.user = user;
    this.fireRate = projectile.fireRate;
    this.projectileGroup = new ProjectileGroup(scene, projectile, 100);
    this.fireElapsedTime = 0;

    this.anims.create({
      key: "use",
      frames: this.anims.generateFrameNames("weapons", {
        prefix: "Auto Cannon/Main Ship - Weapons - Auto Cannon-",
        end: 6,
        zeroPad: 1,
      }),
      frameRate: 6000 / this.fireRate,
    });

    this.anims.create({
      key: "idle",
      frames: [
        {
          key: "weapons",
          frame: "Auto Cannon/Main Ship - Weapons - Auto Cannon-0",
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

  use(keySpace, time) {
    if (keySpace.isDown) {
      if (time > this.fireElapsedTime) {
        this.fireElapsedTime = time + this.fireRate;

        this.anims.play("use");

        this.projectileGroup
          .getProjectile()
          .shootProjectile(this.user.ship.x - 8, this.user.ship.y - 20, "up");

        this.projectileGroup
          .getProjectile()
          .shootProjectile(this.user.ship.x + 8, this.user.ship.y - 20, "up");
      }
    }
  }
}

class BigSpaceGun extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, user, projectile) {
    super(
      scene,
      user.x,
      user.y - 5,
      "weapons",
      "Big Space Gun/Main Ship - Weapons - Big Space Gun-0"
    );

    this.user = user;
    this.minProjectScaleFactor = 0.5;
    this.projectileScaleFactor = this.minProjectScaleFactor;
    this.maxProjectileScaleFactor = 2;
    this.projectileScaleRate = 0.01;
    this.projectileGroup = new ProjectileGroup(scene, projectile, 100);

    this.anims.create({
      key: "charging",
      frames: this.anims.generateFrameNames("weapons", {
        prefix: "Big Space Gun/Main Ship - Weapons - Big Space Gun-",
        end: 6,
        zeroPad: 1,
      }),
    });

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNames("weapons", {
        prefix: "Big Space Gun/Main Ship - Weapons - Big Space Gun-",
        start: 7,
        end: 11,
        zeroPad: 1,
      }),
    });

    scene.keySpace.on("up", () => {
      this.anims.play("shoot");
      this.projectileGroup
        .getProjectile()
        .shootProjectile(
          this.user.ship.x,
          this.user.ship.y - 20,
          "up",
          this.projectileScaleFactor
        );
      this.projectileScaleFactor = this.minProjectScaleFactor;
    });

    this.scene.add.existing(this);
  }

  use(keySpace) {
    if (keySpace.isDown) {
      if (this.projectileScaleFactor < this.maxProjectileScaleFactor) {
        this.projectileScaleFactor += this.projectileScaleRate;
      }
      this.anims.play("charging", true);
    }
  }
}

class Rockets extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, user, projectile) {
    super(
      scene,
      user.x,
      user.y,
      "weapons",
      "Rockets/Main Ship - Weapons - Rockets-0"
    );

    this.user = user;
    this.fireRate = projectile.fireRate;
    this.fireElapsedTime = 0;
    this.projectileGroup = new ProjectileGroup(scene, projectile, 100);

    this.anims.create({
      key: "use",
      frames: this.anims.generateFrameNames("weapons", {
        prefix: "Rockets/Main Ship - Weapons - Rockets-",
        end: 15,
        zeroPad: 1,
      }),
      showOnStart: true,
      hideOnComplete: true,
      frameRate: 6000 / this.fireRate,
    });

    this.on(
      Phaser.Animations.Events.ANIMATION_UPDATE,
      function (anim, frame, gameObject) {
        switch (frame.index) {
          case 2:
            this.projectileGroup
              .getProjectile()
              .shootProjectile(
                this.user.ship.x - 6,
                this.user.ship.y - 10,
                "up"
              );
            break;

          case 4:
            this.projectileGroup
              .getProjectile()
              .shootProjectile(
                this.user.ship.x + 6,
                this.user.ship.y - 10,
                "up"
              );
            break;

          case 6:
            this.projectileGroup
              .getProjectile()
              .shootProjectile(this.user.ship.x - 10, this.user.ship.y, "up");
            break;

          case 8:
            this.projectileGroup
              .getProjectile()
              .shootProjectile(this.user.ship.x + 10, this.user.ship.y, "up");
            break;

          case 10:
            this.projectileGroup
              .getProjectile()
              .shootProjectile(this.user.ship.x - 14, this.user.ship.y, "up");
            break;

          case 12:
            this.projectileGroup
              .getProjectile()
              .shootProjectile(this.user.ship.x + 14, this.user.ship.y, "up");
            break;
        }
      }
    );

    this.scene.add.existing(this);
  }

  use(keySpace, time) {
    if (keySpace.isDown) {
      if (time > this.fireElapsedTime) {
        this.fireElapsedTime = time + this.fireRate;

        this.anims.play("use", true);
      }
    }
  }
}

class Zapper extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, user, projectile) {
    super(
      scene,
      user.x,
      user.y,
      "weapons",
      "Zapper/Main Ship - Weapons - Zapper-10"
    );

    this.user = user;
    this.projectileGroup = new ProjectileGroup(scene, projectile, 100);
    this.laserBeam1 = this.projectileGroup.getProjectile(1);
    this.laserBeam2 = this.projectileGroup.getProjectile(2);

    this.anims.create({
      key: "use",
      frames: this.anims.generateFrameNames("weapons", {
        prefix: "Zapper/Main Ship - Weapons - Zapper-",
        end: 10,
        zeroPad: 1,
      }),
      frameRate: 24,
    });

    scene.keySpace.on("up", () => {
      this.anims.setProgress(0);
      this.anims.stop;
    });

    this.scene.add.existing(this);
  }

  use(keySpace) {
    if (keySpace.isDown) {
      this.anims.play("use");
      this.laserBeam1.shoot(this.user.ship.x - 8, this.user.ship.y - 33);
      this.laserBeam2.shoot(this.user.ship.x + 8, this.user.ship.y - 33);
    } else if (this.laserBeam1 != null && this.laserBeam2 != null) {
      this.laserBeam1.disableBody(true, true);
      this.laserBeam2.disableBody(true, true);
    }
  }
}
