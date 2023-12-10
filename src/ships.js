import ProjectileGroup from "./projectiles";

var getShipType = function (shipName) {
  const ships = {
    Proto: {
      sprite: "8x8/SpaceShooterAssetPack_Ships-1.png",
      leftTurnSprite: "8x8/SpaceShooterAssetPack_Ships-2.png",
      rightTurnSprite: "8x8/SpaceShooterAssetPack_Ships-0.png",
      projectileType: "laser",
      health: 100,
      speed: 100,
    },

    Dom: {
      sprite: "8x8/SpaceShooterAssetPack_Ships-4.png",
      leftTurnSprite: "8x8/SpaceShooterAssetPack_Ships-5.png",
      rightTurnSprite: "8x8/SpaceShooterAssetPack_Ships-3.png",
      projectileType: "laser",
      health: 100,
      speed: 100,
    },
  };

  return ships[shipName];
};

export default class ShipGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, shipName) {
    super(scene.physics.world, scene);

    this.shipType = getShipType(shipName);

    this.group = this.createMultiple({
      key: "ships",
      frame: this.shipType.sprite,
      frameQuantity: 20,
      active: false,
      visible: false,
    });

    this.group.forEach((ships) => (ships.data = this.shipType));

    this.projectileGroup = new ProjectileGroup(
      scene,
      this.shipType.projectileType
    );

    this.scene.anims.create({
      key: "straight",
      frames: [{ key: "ships", frame: this.shipType.sprite }],
      frameRate: 1,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "left",
      frames: [{ key: "ships", frame: this.shipType.leftTurnSprite }],
      frameRate: 1,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "right",
      frames: [{ key: "ships", frame: this.shipType.rightTurnSprite }],
      frameRate: 1,
      repeat: -1,
    });
  }

  spawnShip(x, y) {
    const ship = this.getFirstDead(false);

    ship.enableBody(true, x, y, true, true);
    ship.setCollideWorldBounds(true);

    return ship;
  }

  shoot(x, y, time) {
    this.projectileGroup.shootProjectile(x, y, time);
  }

  damage(ship, projectile) {
    ship.data.health -= projectile.data.damage;
    projectile.disableBody(true, true);

    if (ship.data.health <= 0) {
      ship.disableBody(true, true);
    }
  }
}
