import getWeapon from "./weapons";

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
        .addHealth(100)
        .addSpeed(100)
        .addWeapon("auto cannon")
        .build();

    case "Kla'ed Battlecruiser":
      return new ShipBuilder(
        scene,
        x,
        y,
        "Kla'ed",
        "Battlecruiser/Weapon/Kla'ed - Battlecruiser - Weapons-0",
        true
      )
        .addDestruction("Kla'ed", "Battlecruiser", 13)
        .addHealth(100)
        .addSpeed(100)
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
        this.ship.destroy();
      },
      this
    );
  }

  addHealth(health) {
    this.health = health;
  }

  addSpeed(speed) {
    this.speed = speed;
  }

  addWeapon(weaponName) {
    this.weapon = getWeapon(this.scene, weaponName, this);
    this.ship.add(this.weapon);
    this.ship.sendToBack(this.weapon);
  }

  moveX(x) {
    this.ship.body.velocity.x = x;
  }

  moveY(y) {
    this.ship.body.velocity.y = y;
  }

  useWeapon(keySpace, time) {
    if (this.weapon != null) {
      this.weapon.use(keySpace, time);
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
}
