import Laser from "./laser";

export default class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.fireElapsedTime = 0;
    this.fireRate = 200;
    this.createMultiple({
      classType: Laser,
      frameQuantity: 100,
      active: false,
      visible: false,
      key: "laser",
    });
  }

  fireLaser(x, y, time) {
    const laser = this.getFirstDead(false);

    if (time > this.fireElapsedTime) {
      laser.fire(x, y);
      this.fireElapsedTime = time + this.fireRate;
    }
  }
}
