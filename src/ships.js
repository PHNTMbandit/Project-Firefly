import spawnProjectileGroup from "./projectiles";

var getShip = function (shipName) {
  const ships = {
    Proto: {
      sprite: "8x8/SpaceShooterAssetPack_Ships-1.png",
      projectileType: "laser",
      health: 100,
      speed: 65,
    },
  };

  return ships[shipName];
};

export default function spawnShip(shipName, scene, x, y) {
  const ship = getShip(shipName);
  return new Ship(
    scene,
    x,
    y,
    ship.sprite,
    ship.projectileType,
    ship.health,
    ship.speed
  );
}

class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite, projectileType, health, speed) {
    super(scene, x, y, "ships", sprite);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.projectileGroup = spawnProjectileGroup(projectileType, scene);
    this.health = health;
    this.speed = speed;
    this.setCollideWorldBounds(true);
  }

  takeDamage(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.disableBody(true, true);
    }
  }
}
