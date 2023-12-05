import spawnProjectileGroup from "./projectiles";

var getShip = function (shipName) {
  const ships = {
    Proto: {
      sprite: "8x8/SpaceShooterAssetPack_Ships-1.png",
      speed: 65,
      projectileType: "laser",
    },
  };

  return ships[shipName];
};

export default function spawnShip(shipName, scene, x, y) {
  const ship = getShip(shipName);
  return new Ship(scene, x, y, ship.sprite, ship.speed, ship.projectileType);
}

class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite, speed, projectileType) {
    super(scene, x, y, "ships", sprite);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = speed;
    this.projectileGroup = spawnProjectileGroup(projectileType, scene);
    this.setCollideWorldBounds(true);
  }
}
