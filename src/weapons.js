import getProjectile from "./projectiles";

export default function getWeapon(scene, name, ship) {
  switch (name) {
    case "Auto Cannon":
      return new AutoCannon(scene, ship.x, ship.y);
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

    this.fireRate = 150;
    this.frameRate = 6000;
    this.fireElapsedTime = 0;
    this.projectileGroup = getProjectile(scene, "Bullet");

    this.anims.create({
      key: "use",
      frames: this.anims.generateFrameNames("weapons", {
        prefix: "auto-cannons/Main Ship - Weapons - Auto Cannon-",
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
          frame: "auto-cannons/Main Ship - Weapons - Auto Cannon-0",
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

  use(ship, time) {
    if (time > this.fireElapsedTime) {
      this.fireElapsedTime = time + this.fireRate;

      this.anims.play("use");
      this.projectileGroup.shoot(ship.x + 6, ship.y);
      this.projectileGroup.shoot(ship.x + 26, ship.y);
    }
  }
}
