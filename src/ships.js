export default class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, name, collidesWithWorld) {
    super(scene, x, y, "player-ship", name);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDamping(true);
    this.setDrag(0.99);
    this.setMaxVelocity(200);
    this.setCollideWorldBounds(collidesWithWorld);
  }
}
