import spawnProjectileGroup from "./projectiles";

var getShip = function (shipName) {
  const ships = {
    Proto: {
      sprite: "8x8/SpaceShooterAssetPack_Ships-1.png",
      leftTurnSprite: "8x8/SpaceShooterAssetPack_Ships-2.png",
      rightTurnSprite: "8x8/SpaceShooterAssetPack_Ships-0.png",
      projectileType: "laser",
      health: 100,
      speed: 65,
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

export default function spawnShip(shipName, scene, x, y) {
  const ship = getShip(shipName);
  return new Ship(
    scene,
    x,
    y,
    ship.sprite,
    ship.leftTurnSprite,
    ship.rightTurnSprite,
    ship.projectileType,
    ship.health,
    ship.speed
  );
}

class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene,
    x,
    y,
    sprite,
    leftTurnSprite,
    rightTurnSprite,
    projectileType,
    health,
    speed
  ) {
    super(scene, x, y, "ships", sprite);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.leftTurnSprite = leftTurnSprite;
    this.rightTurnSprite = rightTurnSprite;
    this.projectileGroup = spawnProjectileGroup(projectileType, scene);
    this.health = health;
    this.speed = speed;
    this.setCollideWorldBounds(true);

    this.scene.anims.create({
      key: "straight",
      frames: [{ key: "ships", frame: sprite }],
      frameRate: 1,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "left",
      frames: [{ key: "ships", frame: leftTurnSprite }],
      frameRate: 1,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "right",
      frames: [{ key: "ships", frame: rightTurnSprite }],
      frameRate: 1,
      repeat: -1,
    });
  }

  takeDamage(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.disableBody(true, true);
    }
  }
}
