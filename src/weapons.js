import getProjectile from "./projectiles";

export default function getWeapon(scene, name, ship) {
  switch (name) {
    case "auto cannon":
      return new AutoCannon(scene, ship.x, ship.y);

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
      "auto-cannons/Main Ship - Weapons - Auto Cannon-0"
    );

    this.fireRate = 200;
    this.frameRate = 6000;
    this.fireElapsedTime = 0;
    this.projectileGroup = getProjectile(scene, "bullet");

    this.anims.create({
      key: "use",
      frames: this.anims.generateFrameNames("weapons", {
        prefix: "auto-cannons/Main Ship - Weapons - Auto Cannon-",
        end: 6,
        zeroPad: 1,
      }),
      frameRate: this.frameRate / this.fireRate,
    });

    this.scene.add.existing(this);
  }

  use(ship, time) {
    if (time > this.fireElapsedTime) {
      this.fireElapsedTime = time + this.fireRate;

      this.anims.play("use");
      this.projectileGroup.shoot(ship.x + 6, ship.y);
      this.projectileGroup.shoot(ship.x + 26, ship.y);
    }
  }
}

class Zapper extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "weapons", "zapper/Main Ship - Weapons - Zapper-0");

    this.projectileGroup = getProjectile(scene, "laser beam");

    this.anims.create({
      key: "use",
      frames: this.anims.generateFrameNames("weapons", {
        prefix: "zapper/Main Ship - Weapons - Zapper-",
        end: 8,
        zeroPad: 1,
      }),
      frameRate: 30,
    });

    this.scene.add.existing(this);
  }

  use(ship) {
    this.anims.play("use", true);
    this.projectileGroup.shoot(ship.x + 16, ship.y);
  }
}
