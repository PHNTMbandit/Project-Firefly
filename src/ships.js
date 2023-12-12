import getWeapon from "./weapons";

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

    this.weapon = getWeapon(scene, "Auto Cannon", this);
    this.speed = speed;
    this.health = health;

    const container = scene.add.container(x, y, [this.weapon, this]);
    container.setSize(32, 32);
    this.physics = scene.physics.add.existing(container);
    this.physics.body.setCollideWorldBounds(collidesWithWorld);
  }

  moveX(x) {
    this.physics.body.velocity.x = x;
  }

  moveY(y) {
    this.physics.body.velocity.y = y;
  }

  shoot(ship, time) {
    this.weapon.use(ship, time);
  }
}
