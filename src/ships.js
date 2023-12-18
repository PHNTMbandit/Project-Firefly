import { getWeapon } from "./weapons";
import { getProjectile } from "./projectiles";
import ProjectileGroup from "./projectiles";

const ships = [
  {
    ID: 0,
    name: "Player",
    health: 100,
    speed: 100,
    weapon: "Zapper",
    spriteSheet: "player-ship",
    sprite: "Main Ship - Base - Full health.png",
    spawn(scene, x, y) {
      return new PlayerShip(scene, x, y, this);
    },
  },
  {
    ID: 1,
    name: "Vaxtra Battlecruiser",
    health: 100,
    speed: 100,
    projectile: "Big Bullet",
    spriteSheet: "Kla'ed",
    sprite: "Battlecruiser/Weapon/Kla'ed - Battlecruiser - Weapons-0",
    destructionSprite:
      "Battlecruiser/Destruction/Kla'ed - Battlecruiser - Destruction-0",
    weaponFrames: 29,
    destructionFrames: 13,
  },
  {
    ID: 2,
    name: "Vaxtra Scout",
    health: 100,
    speed: 100,
    projectile: "Bullet",
    spriteSheet: "Kla'ed",
    sprite: "Scout/Weapon/Kla'ed - Scout - Weapons-0",
    destructionSprite: "Scout/Destruction/Kla'ed - Scout - Destruction-0",
    weaponFrames: 5,
    destructionFrames: 8,
  },
];

export var getShip = function (name) {
  return ships.find((i) => i.name == name);
};

export var getShipBySprite = function (sprite) {
  return ships.find((i) => i.sprite === sprite);
};

export default class EnemyGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, amount, ship) {
    super(scene.physics.world, scene);

    const projectile = getProjectile(ship.projectile);
    this.projectileGroup = new ProjectileGroup(scene, projectile, 50);

    this.createMultiple({
      classType: EnemyShip,
      key: ship.spriteSheet,
      frame: ship.sprite,
      frameQuantity: amount,
      active: false,
      visible: false,
    });

    scene.anims.create({
      key: `${ship.name} shoot`,
      frames: scene.anims.generateFrameNames(ship.spriteSheet, {
        prefix: ship.sprite.slice(0, -1),
        end: ship.weaponFrames,
        zeroPad: 1,
      }),
      frameRate: 6000 / projectile.fireRate,
    });

    scene.anims.create({
      key: `${ship.name} destruction`,
      frames: scene.anims.generateFrameNames(ship.spriteSheet, {
        prefix: ship.destructionSprite.slice(0, -1),
        end: ship.destructionFrames,
        zeroPad: 1,
      }),
      frameRate: 15,
    });
  }

  spawnShip(x, y) {
    const ship = this.getFirstDead(false);
    ship.enableBody(true, x, y, true, true);

    return ship;
  }

  shoot(ship, time, x, y) {
    ship.shoot(time, x, y, this.projectileGroup);
  }

  takeDamage(target, projectile) {
    target.takeDamage(target, projectile);
  }
}

class EnemyShip extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteSheet, sprite) {
    super(scene, x, y, spriteSheet, sprite);

    this.scene.physics.add.existing(this);
    this.body.setSize(this.frame.cutWidth, this.frame.cutHeight);
    this.setFlipY(true);

    const shipData = getShipBySprite(sprite);
    this.projectile = getProjectile(shipData.projectile);
    this.name = shipData.name;
    this.sprite = sprite;
    this.health = shipData.health;
    this.fireElapsedTime = 0;

    this.on(
      "animationcomplete",
      (e) => {
        if (e.key == `${this.name} destruction`) {
          this.disableBody(true, true);
        }
      },
      this
    );
  }

  takeDamage(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.anims.remove(`${this.name} shoot`);
      this.anims.play(`${this.name} destruction`);
      this.body.checkCollision.none = true;
    }
  }

  shoot(time, x, y, projectileGroup) {
    if (this.health > 0) {
      if (time > this.fireElapsedTime) {
        this.fireElapsedTime = time + this.projectile.fireRate;
        this.anims.play(`${this.name} shoot`, true);
        projectileGroup.getProjectile().shootProjectile(x, y, "down");
      }
    }
  }

  flashColor(color, delay) {
    this.setTintFill(color);

    this.scene.time.delayedCall(delay, () => {
      this.clearTint();
    });
  }
}

class PlayerShip extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, { health, speed, spriteSheet, sprite, weapon }) {
    super(scene, 0, 0, spriteSheet, sprite);

    this.scene.add.existing(this);
    this.ship = scene.add.container(x, y, this);
    this.ship.setSize(this.frame.cutWidth, this.frame.cutHeight);
    this.scene.physics.world.enable(this.ship);
    this.ship.body.setCollideWorldBounds(true);

    this.weapon = getWeapon(weapon).spawnWeapon(this.scene, this);
    this.ship.add(this.weapon);
    this.ship.sendToBack(this.weapon);
    this.health = health;
    this.speed = speed;
    this.sprite = sprite;
  }

  moveX(x) {
    this.ship.body.velocity.x = x;
  }

  moveY(y) {
    this.ship.body.velocity.y = y;
  }

  useWeapon(keySpace, time) {
    this.weapon.use(keySpace, time);
  }

  takeDamage(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.anims.play(`${this.sprite} destruction`);
      this.ship.body.checkCollision.none = true;
    }
  }

  flashColor(color, delay) {
    this.setTintFill(color);
    this.weapon.setTintFill(color);

    this.scene.time.delayedCall(delay, () => {
      this.clearTint();
      this.weapon.clearTint();
    });
  }
}
