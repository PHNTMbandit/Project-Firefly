import { getProjectileGroup } from "./projectiles";

class Ship {
  constructor(name, spriteName, speed, projectiles) {
    this.name = name;
    this.spriteName = spriteName;
    this.speed = speed;
    this.projectiles = projectiles;
  }
}

var getShip = function (shipID, scene) {
  const ships = {
    0: new Ship(
      "Proto",
      "8x8/SpaceShooterAssetPack_Ships-1.png",
      65,
      getProjectileGroup("laser", scene)
    ),
  };

  return ships[shipID];
};

export function spawnShip(shipID, scene, x, y) {
  const ship = getShip(shipID, scene);
  const sprite = scene.physics.add.sprite(x, y, "ships", ship.spriteName);

  sprite.setCollideWorldBounds(true);

  return {
    ship: ship,
    sprite: sprite,
  };
}
