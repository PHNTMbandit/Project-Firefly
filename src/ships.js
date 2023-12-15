import getWeapon from "./weapons";
import getProjectileGroup from "./projectiles";

var shipData = function getProjectileData(name) {
  const shipData = {
    Player: {
      health: 100,
      speed: 100,
    },
    "Vaxtra Battlecruiser": {
      health: 100,
      speed: 100,
    },
    "Vaxtra Scout": {
      health: 100,
      speed: 100,
    },
  };

  return shipData[name];
};

export default function getShip(scene, x, y, shipName) {
  switch (shipName) {
    case "Player":
      return new ShipBuilder(
        scene,
        x,
        y,
        "player-ship",
        "Main Ship - Base - Full health.png",
        "Main Ship",
        shipData(shipName),
        true
      )
        .addHealth()
        .addSpeed()
        .addWeapon("Auto Cannon")
        .build();

    case "Vaxtra Battlecruiser":
      return new ShipBuilder(
        scene,
        x,
        y,
        "Kla'ed",
        "Battlecruiser/Weapon/Kla'ed - Battlecruiser - Weapons-0",
        "Battlecruiser",
        shipData(shipName),
        true
      )
        .addDestruction(13)
        .addHealth()
        .addProjectileGroup(getProjectileGroup(scene, "Vaxtra Bullet"), 29)
        .addSpeed()
        .build();

    case "Vaxtra Scout":
      return new ShipBuilder(
        scene,
        x,
        y,
        "Kla'ed",
        "Scout/Weapon/Kla'ed - Scout - Weapons-0",
        "Scout",
        shipData(shipName),
        true
      )
        .addDestruction(13)
        .addHealth()
        .addProjectileGroup(getProjectileGroup(scene, "Vaxtra Bullet"), 5)
        .addSpeed()
        .build();
  }
}

class ShipBuilder {
  constructor(
    scene,
    x,
    y,
    spriteSheet,
    spriteName,
    shipName,
    shipData,
    collidesWithWorld
  ) {
    this.ship = new Ship(
      scene,
      x,
      y,
      spriteSheet,
      spriteName,
      shipName,
      shipData,
      collidesWithWorld
    );
  }

  addDestruction(frames) {
    this.ship.addDestructability(frames);
    return this;
  }

  addHealth() {
    this.ship.addHealth();
    return this;
  }

  addProjectileGroup(projectileGroup, frames) {
    this.ship.addProjectileGroup(projectileGroup, frames);
    return this;
  }

  addSpeed() {
    this.ship.addSpeed();
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
    shipData,
    collidesWithWorld
  ) {
    super(scene, 0, 0, spriteSheet, spriteName);

    this.scene.add.existing(this);
    this.ship = scene.add.container(x, y, this);
    this.ship.setSize(this.frame.width, this.frame.height);
    this.scene.physics.world.enable(this.ship);
    this.ship.body.setCollideWorldBounds(collidesWithWorld);

    this.fireElapsedTime = 0;
    this.spriteSheet = spriteSheet;
    this.shipName = shipName;
    this.shipData = shipData;
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

  addHealth() {
    this.health = this.shipData.health;
  }

  addProjectileGroup(projectileGroup, frames) {
    this.projectileGroup = projectileGroup;
    this.frameRate = 6000;

    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNames(this.spriteSheet, {
        prefix: `${this.shipName}/Weapon/${this.spriteSheet} - ${this.shipName} - Weapons-`,
        end: frames,
        zeroPad: 1,
      }),
      frameRate: this.frameRate / this.projectileGroup.projectileData.fireRate,
    });
  }

  addSpeed() {
    this.speed = this.shipData.speed;
  }

  addWeapon(weaponName) {
    this.weapon = getWeapon(this.scene, weaponName, this);
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
      this.fireElapsedTime =
        time + this.projectileGroup.projectileData.fireRate;

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
