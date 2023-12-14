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
        true
      )
        .addHealth(shipData(shipName).health)
        .addSpeed(shipData(shipName).speed)
        .addWeapon("Auto Cannon")
        .build();

    case "Vaxtra Battlecruiser":
      return new ShipBuilder(
        scene,
        x,
        y,
        "Kla'ed",
        "Battlecruiser/Weapon/Kla'ed - Battlecruiser - Weapons-0",
        true
      )
        .addDestruction("Kla'ed", "Battlecruiser", 13)
        .addHealth(shipData(shipName).health)
        .addSpeed(shipData(shipName).speed)
        .build();

    case "Vaxtra Scout":
      return new ShipBuilder(
        scene,
        x,
        y,
        "Kla'ed",
        "Scout/Weapon/Kla'ed - Scout - Weapons-0",
        true
      )
        .addDestruction("Kla'ed", "Scout", 13)
        .addHealth(shipData(shipName).health)
        .addProjectileGroup(getProjectileGroup(scene, "Vaxtra Bullet"))
        .addSpeed(shipData(shipName).speed)
        .build();
  }
}

class ShipBuilder {
  constructor(scene, x, y, spriteSheet, spriteName, collidesWithWorld) {
    this.ship = new Ship(
      scene,
      x,
      y,
      spriteSheet,
      spriteName,
      collidesWithWorld
    );
  }

  addDestruction(spriteSheet, shipName, frames) {
    this.ship.addDestructability(spriteSheet, shipName, frames);
    return this;
  }

  addHealth(health) {
    this.ship.addHealth(health);
    return this;
  }

  addProjectileGroup(projectileGroup) {
    this.ship.addProjectileGroup(projectileGroup);
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
  constructor(scene, x, y, spriteSheet, spriteName, collidesWithWorld) {
    super(scene, 0, 0, spriteSheet, spriteName);

    this.scene.add.existing(this);
    this.ship = scene.add.container(x, y, this);
    this.ship.setSize(this.frame.width, this.frame.height);
    this.scene.physics.world.enable(this.ship);
    this.ship.body.setCollideWorldBounds(collidesWithWorld);
    this.fireElapsedTime = 0;
  }

  addDestructability(spriteSheet, shipName, frames) {
    this.anims.create({
      key: "destruction",
      frames: this.anims.generateFrameNames(spriteSheet, {
        prefix: `${shipName}/Destruction/${spriteSheet} - ${shipName} - Destruction-`,
        start: 4,
        end: frames,
        zeroPad: 1,
      }),
      frameRate: 15,
    });

    this.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE,
      function () {
        this.setActive(false);
        this.ship.destroy();
      },
      this
    );
  }

  addHealth(health) {
    this.health = health;
  }

  addProjectileGroup(projectileGroup) {
    this.projectileGroup = projectileGroup;
  }

  addSpeed(speed) {
    this.speed = speed;
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
    console.log();
    this.ship.body.velocity.y = y;
  }

  shoot(time, x, y) {
    if (time > this.fireElapsedTime) {
      this.fireElapsedTime =
        time + this.projectileGroup.projectileData.fireRate;
      this.projectileGroup.shootProjectile(x, y, "down");
    }
  }

  takeDamage(amount) {
    this.health -= amount;
    this.flashColor(this.scene, 0xffffff, 15 * amount);

    if (this.health <= 0) {
      this.ship.body.checkCollision.none = true;
      this.anims.play("destruction", true);
    }
  }

  useWeapon(keySpace, time) {
    if (this.weapon != null) {
      this.weapon.use(keySpace, time);
    }
  }
}
