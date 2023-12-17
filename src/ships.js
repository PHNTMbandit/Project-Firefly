import { getWeapon } from "./weapons";
import { getProjectile } from "./projectiles";
import ProjectileGroup from "./projectiles";

export var getShip = function (name) {
  const ships = {
    Player: {
      health: 100,
      speed: 100,
      weapon: "Auto Cannon",
      spawnShip(scene, x, y) {
        return new ShipBuilder(
          scene,
          x,
          y,
          "player-ship",
          "Main Ship - Base - Full health.png",
          "Main Ship",
          true
        )
          .addHealth(this.health)
          .addSpeed(this.speed)
          .addWeapon(this.weapon)
          .build();
      },
    },
    "Vaxtra Battlecruiser": {
      health: 100,
      speed: 100,
      projectile: "Vaxtra Big Bullet",
      spawnShip(scene, x, y) {
        return new ShipBuilder(
          scene,
          x,
          y,
          "Kla'ed",
          "Battlecruiser/Weapon/Kla'ed - Battlecruiser - Weapons-0",
          "Battlecruiser",
          true
        )
          .addDestruction(13)
          .addHealth(this.health)
          .addProjectile(getProjectile(this.projectile), 29)
          .addSpeed(this.speed)
          .build();
      },
    },
    "Vaxtra Scout": {
      health: 100,
      speed: 100,
      projectile: "Vaxtra Bullet",
      spawnShip(scene, x, y) {
        return new ShipBuilder(
          scene,
          x,
          y,
          "Kla'ed",
          "Scout/Weapon/Kla'ed - Scout - Weapons-0",
          "Scout",
          true
        )
          .addDestruction(8)
          .addHealth(this.health)
          .addProjectile(getProjectile(this.projectile), 5)
          .addSpeed(this.speed)
          .build();
      },
    },
  };

  return ships[name];
};

class ShipBuilder {
  constructor(
    scene,
    x,
    y,
    spriteSheet,
    spriteName,
    shipName,
    collidesWithWorld
  ) {
    this.ship = new Ship(
      scene,
      x,
      y,
      spriteSheet,
      spriteName,
      shipName,
      collidesWithWorld
    );
  }

  addDestruction(frames) {
    this.ship.addDestructability(frames);
    return this;
  }

  addHealth(health) {
    this.ship.addHealth(health);
    return this;
  }

  addProjectile(projectile, shootingFrames) {
    this.ship.addProjectileGroup(projectile, shootingFrames);
    return this;
  }

  addSpeed(speed) {
    this.ship.addSpeed(speed);
    return this;
  }

  addWeapon(weaponName) {
    this.ship.addWeapon(weaponName);
    return this;
  }

  build() {
    return this.ship;
  }
}

class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene,
    x,
    y,
    spriteSheet,
    spriteName,
    shipName,
    collidesWithWorld
  ) {
    super(scene, 0, 0, spriteSheet, spriteName);

    this.scene.add.existing(this);
    this.ship = scene.add.container(x, y, this);
    this.ship.setSize(this.frame.cutWidth, this.frame.cutHeight);
    this.scene.physics.world.enable(this.ship);
    this.ship.body.setCollideWorldBounds(collidesWithWorld);

    this.fireElapsedTime = 0;
    this.spriteSheet = spriteSheet;
    this.shipName = shipName;
  }

  addDestructability(frames) {
    this.anims.create({
      key: "destruction",
      frames: this.anims.generateFrameNames(this.spriteSheet, {
        prefix: `${this.shipName}/Destruction/${this.spriteSheet} - ${this.shipName} - Destruction-`,
        start: 4,
        end: frames,
        zeroPad: 1,
      }),
      frameRate: 15,
    });

    this.on(
      "animationcomplete",
      (e) => {
        if (e.key == "destruction") {
          this.setActive(false);
          this.ship.destroy();
        }
      },
      this
    );
  }

  addHealth(health) {
    this.health = health;
  }

  addProjectileGroup(projectile, shootingFrames) {
    this.projectileGroup = new ProjectileGroup(this.scene, projectile, 100);

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNames(this.spriteSheet, {
        prefix: `${this.shipName}/Weapon/${this.spriteSheet} - ${this.shipName} - Weapons-`,
        end: shootingFrames,
        zeroPad: 1,
      }),
      frameRate: 6000 / projectile.fireRate,
    });
  }

  addSpeed(speed) {
    this.speed = speed;
  }

  addWeapon(weaponName) {
    this.weapon = getWeapon(weaponName).spawnWeapon(this.scene, this);
    this.ship.add(this.weapon);
    this.ship.sendToBack(this.weapon);
  }

  flashColor(scene, color, delay) {
    this.setTintFill(color);
    if (this.weapon != null) {
      this.weapon.setTintFill(color);
    }

    scene.time.delayedCall(delay, () => {
      this.clearTint();
      if (this.weapon != null) {
        this.weapon.clearTint();
      }
    });
  }

  moveX(x) {
    this.ship.body.velocity.x = x;
  }

  moveY(y) {
    this.ship.body.velocity.y = y;
  }

  shoot(time, x, y) {
    if (time > this.fireElapsedTime) {
      this.fireElapsedTime = time + this.projectileGroup.projectile.fireRate;

      if (this.anims.exists("shoot")) {
        this.anims.play("shoot", true);
        this.projectileGroup.shootProjectile(x, y, "down");
      }
    }
  }

  takeDamage(amount) {
    this.health -= amount;
    this.flashColor(this.scene, 0xffffff, 15 * amount);

    if (this.health <= 0) {
      this.anims.remove("shoot");
      this.ship.body.checkCollision.none = true;
      this.anims.play("destruction");
    }
  }

  useWeapon(keySpace, time) {
    if (this.weapon != null) {
      this.weapon.use(keySpace, time);
    }
  }
}
