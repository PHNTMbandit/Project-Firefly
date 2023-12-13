import getProjectile from "./projectiles";

export default function getWeapon(scene, name, ship) {
  switch (name) {
    case "auto cannon":
      return new AutoCannon(scene, ship.x, ship.y);

    case "rockets":
      return new Rockets(scene, ship.x, ship.y);

    case "zapper":
      return new Zapper(scene, ship.x, ship.y);
  }
}

class AutoCannon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      "weapons",
      "Auto Cannons/Main Ship - Weapons - Auto Cannon-0"
    );

    this.fireRate = 200;
    this.frameRate = 6000;
    this.fireElapsedTime = 0;
    this.projectileGroup = getProjectile(scene, "bullet");

    this.anims.create({
      key: "use",
      frames: this.anims.generateFrameNames("weapons", {
        prefix: "Auto Cannons/Main Ship - Weapons - Auto Cannon-",
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
          frame: "Auto Cannons/Main Ship - Weapons - Auto Cannon-0",
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

  use(shipBody, time) {
    if (time > this.fireElapsedTime) {
      this.fireElapsedTime = time + this.fireRate;

      this.anims.play("use");
      this.projectileGroup
        .getProjectile()
        .shoot(shipBody.x - 8, shipBody.y - 20);
      this.projectileGroup
        .getProjectile()
        .shoot(shipBody.x + 8, shipBody.y - 20);
    }
  }

  disuse() {}
}

class Rockets extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "weapons", "Rockets/Main Ship - Weapons - Rockets-0");

    this.fireRate = 200;
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
      frameRate: this.frameRate / this.fireRate,
    });

    this.scene.add.existing(this);
  }

  use(shipBody, time) {
    if (time > this.fireElapsedTime) {
      this.fireElapsedTime = time + this.fireRate;

      this.anims.play("use");
      this.projectileGroup
        .getProjectile()
        .shoot(shipBody.x - 8, shipBody.y - 20);
      this.projectileGroup
        .getProjectile()
        .shoot(shipBody.x + 8, shipBody.y - 20);
    }
  }

  disuse() {}
}

class Zapper extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "weapons", "Zapper/Main Ship - Weapons - Zapper-10");

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

    this.anims.create({
      key: "idle",
      frames: [
        {
          key: "weapons",
          frame: "Zapper/Main Ship - Weapons - Zapper-10",
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

  use(shipBody) {
    this.anims.play("use");
    this.laserBeam1.shoot(shipBody.x - 8, shipBody.y - 33);
    this.laserBeam2.shoot(shipBody.x + 8, shipBody.y - 33);
  }

  disuse() {
    if (this.laserBeam1 != null && this.laserBeam2 != null) {
      this.laserBeam1.disableBody(true, true);
      this.laserBeam2.disableBody(true, true);
    }
  }
}
