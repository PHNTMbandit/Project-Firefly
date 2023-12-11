export default class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene,
    x,
    y,
    spriteSheet,
    name,
    collidesWithWorld,
    health,
    speed
  ) {
    super(scene, 0, 0, spriteSheet, name);

    this.weapon = new AutoCannon(scene, 0, 0, this);
    this.speed = speed;
    this.health = health;

    const container = scene.add.container(x, y, [this.weapon, this]);
    container.setSize(48, 48);
    this.physics = scene.physics.add.existing(container);
    this.physics.body.setCollideWorldBounds(collidesWithWorld);
  }

  moveX(x) {
    this.physics.body.velocity.x = x;
  }

  moveY(y) {
    this.physics.body.velocity.y = y;
  }
}

class AutoCannon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, ship) {
    super(
      scene,
      x,
      y,
      "weapons",
      "auto-cannons/Main Ship - Weapons - Auto Cannon-0"
    );
  }
}
