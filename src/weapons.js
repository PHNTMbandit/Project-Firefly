import getProjectile from "./projectiles";

export default function getWeapon(scene, name, ship) {
  switch (name) {
    case "auto cannon":
      return new AutoCannon(scene, ship);

    case "big space gun":
      return new BigSpaceGun(scene, ship);

    case "rockets":
      return new Rockets(scene, ship);

    case "zapper":
      return new Zapper(scene, ship);
  }
}

class AutoCannon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, ship) {
    super(
      scene,
      ship.x,
      ship.y,
      "weapons",
      "Auto Cannon/Main Ship - Weapons - Auto Cannon-0"
    );

    this.ship = ship;
    this.fireRate = 200;
    this.frameRate = 6000;
    this.fireElapsedTime = 0;
    this.projectileGroup = getProjectile(scene, "bullet");

    this.anims.create({
      key: "use",
      frames: this.anims.generateFrameNames("weapons", {
        prefix: "Auto Cannon/Main Ship - Weapons - Auto Cannon-",
        end: 6,
        zeroPad: 1,
      }),
      frameRate: this.frameRate / this.fireRate,
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
          .shoot(this.ship.physics.x - 8, this.ship.physics.y - 20);
        this.projectileGroup
          .getProjectile()
          .shoot(this.ship.physics.x + 8, this.ship.physics.y - 20);
      }
    }
  }
}

class BigSpaceGun extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, ship) {
    super(
      scene,
      ship.x,
      ship.y - 5,
      "weapons",
      "Big Space Gun/Main Ship - Weapons - Big Space Gun-0"
    );

    this.ship = ship;
    this.minProjectScaleFactor = 0.5;
    this.projectileScaleFactor = this.minProjectScaleFactor;
    this.maxProjectileScaleFactor = 2;
    this.projectileScaleRate = 0.01;
    this.projectileGroup = getProjectile(scene, "energy ball");

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
      const projectile = this.projectileGroup.getProjectile();
      projectile.setScale(
        this.projectileScaleFactor,
        this.projectileScaleFactor
      );
      projectile.shoot(this.ship.physics.x, this.ship.physics.y - 20);
      this.projectileScaleFactor = this.minProjectScaleFactor;
    });

    this.scene.add.existing(this);
  }

  use(keySpace) {
    if (keySpace.isDown) {
      console.log(this.projectileScaleFactor);
      if (this.projectileScaleFactor < this.maxProjectileScaleFactor) {
        this.projectileScaleFactor += this.projectileScaleRate;
      }
      this.anims.play("charging", true);
    }
  }
}

class Rockets extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, ship) {
    super(
      scene,
      ship.x,
      ship.y,
      "weapons",
      "Rockets/Main Ship - Weapons - Rockets-0"
    );

    this.ship = ship;
    this.fireRate = 600;
    this.frameRate = 6000;
    this.fireElapsedTime = 0;
    this.projectileGroup = getProjectile(scene, "rocket");

    this.anims.create({
      key: "use",
      frames: this.anims.generateFrameNames("weapons", {
        prefix: "Rockets/Main Ship - Weapons - Rockets-",
        end: 15,
        zeroPad: 1,
      }),
      showOnStart: true,
      hideOnComplete: true,
      frameRate: this.frameRate / this.fireRate,
    });

    this.on(
      Phaser.Animations.Events.ANIMATION_UPDATE,
      function (anim, frame, gameObject) {
        switch (frame.index) {
          case 2:
            this.projectileGroup
              .getProjectile()
              .shoot(this.ship.physics.x - 6, this.ship.physics.y - 10);
            break;

          case 4:
            this.projectileGroup
              .getProjectile()
              .shoot(this.ship.physics.x + 6, this.ship.physics.y - 10);
            break;

          case 6:
            this.projectileGroup
              .getProjectile()
              .shoot(this.ship.physics.x - 10, this.ship.physics.y);
            break;

          case 8:
            this.projectileGroup
              .getProjectile()
              .shoot(this.ship.physics.x + 10, this.ship.physics.y);
            break;

          case 10:
            this.projectileGroup
              .getProjectile()
              .shoot(this.ship.physics.x - 14, this.ship.physics.y);
            break;

          case 12:
            this.projectileGroup
              .getProjectile()
              .shoot(this.ship.physics.x + 14, this.ship.physics.y);
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
  constructor(scene, ship) {
    super(
      scene,
      ship.x,
      ship.y,
      "weapons",
      "Zapper/Main Ship - Weapons - Zapper-10"
    );

    this.ship = ship;
    this.projectileGroup = getProjectile(scene, "laser beam");
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
      this.laserBeam1.shoot(this.ship.physics.x - 8, this.ship.physics.y - 33);
      this.laserBeam2.shoot(this.ship.physics.x + 8, this.ship.physics.y - 33);
    } else if (this.laserBeam1 != null && this.laserBeam2 != null) {
      this.laserBeam1.disableBody(true, true);
      this.laserBeam2.disableBody(true, true);
    }
  }
}
