import Laser from "./laser";

let lasers;
let fireElapsedTime = 0;
let fireRate = 200;

export default class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    lasers = this.createMultiple({
      classType: Laser,
      frameQuantity: 5,
      active: false,
      visible: false,
      key: "laser",
    });
  }

  fireLaser(x, y, time) {
    const laser = this.getFirstDead(false);

    if (time > fireElapsedTime) {
      laser.fire(x, y);
      fireElapsedTime = time + fireRate;
    }
  }
}
