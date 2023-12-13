import getWeapon from "./weapons";

export default function getShip(scene, x, y, shipName) {
  switch (shipName) {
    case "player":
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
        .addWeapon(scene, "big space gun")
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

  addHealth(health) {
    this.ship.addHealth(health);
    return this;
  }

  addSpeed(speed) {
    this.ship.addSpeed(speed);
    return this;
  }

  addWeapon(scene, weaponName) {
    this.ship.addWeapon(scene, weaponName);
    return this;
  }

  build() {
    return this.ship;
  }
}

class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteSheet, spriteName, collidesWithWorld) {
    super(scene, 0, 0, spriteSheet, spriteName);

    this.container = scene.add.container(x, y, this);
    this.container.setSize(32, 32);
    this.physics = scene.physics.add.existing(this.container);
    this.physics.body.setCollideWorldBounds(collidesWithWorld);
  }

  addHealth(health) {
    this.health = health;
  }

  addSpeed(speed) {
    this.speed = speed;
  }

  addWeapon(scene, weaponName) {
    this.weapon = getWeapon(scene, weaponName, this);
    this.physics.add(this.weapon);
    this.container.sendToBack(this.weapon);
  }

  moveX(x) {
    this.physics.body.velocity.x = x;
  }

  moveY(y) {
    this.physics.body.velocity.y = y;
  }

  shoot(keySpace, time) {
    if (this.weapon != null) {
      this.weapon.use(keySpace, time);
    }
  }
}
