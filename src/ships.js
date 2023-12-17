import { getWeapon } from "./weapons";
import { getProjectile } from "./projectiles";
import ProjectileGroup from "./projectiles";

export var getShip = function (name) {
  const ships = {
    Player: {
      shipType: PlayerShip,
      health: 100,
      speed: 100,
      weapon: "Auto Cannon",
      spriteSheet: "player-ship",
      sprite: "Main Ship - Base - Full health.png",
      spawn(scene, x, y) {
        return new PlayerShip(scene, x, y, this);
      },
    },
    "Vaxtra Battlecruiser": {
      shipType: EnemyShip,
      health: 100,
      speed: 100,
      projectile: "Vaxtra Big Bullet",
      spriteSheet: "Kla'ed",
      sprite: "Battlecruiser/Weapon/Kla'ed - Battlecruiser - Weapons-0",
      destructionSprite:
        "Battlecruiser/Destruction/Kla'ed - Battlecruiser - Destruction-0",
      weaponFrames: 29,
      destructionFrames: 13,
    },
    "Vaxtra Scout": {
      shipType: EnemyShip,
      health: 100,
      speed: 100,
      projectile: "Vaxtra Bullet",
      spriteSheet: "Kla'ed",
      sprite: "Scout/Weapon/Kla'ed - Scout - Weapons-0",
      destructionSprite: "Scout/Destruction/Kla'ed - Scout - Destruction-0",
      weaponFrames: 5,
      destructionFrames: 8,
    },
  };

  return ships[name];
};

export default class EnemyGroup extends Phaser.Physics.Arcade.Group {
  constructor(
    scene,
    amount,
    {
      shipType,
      health,
      projectile,
      spriteSheet,
      sprite,
      destructionSprite,
      weaponFrames,
      destructionFrames,
    }
  ) {
    super(scene.physics.world, scene);

    this.health = health;
    this.sprite = sprite;

    this.createMultiple({
      classType: shipType,
      key: spriteSheet,
      frame: sprite,
      frameQuantity: amount,
      active: false,
      visible: false,
    });

    this.projectileGroup = new ProjectileGroup(
      scene,
      getProjectile(projectile),
      100
    );

    scene.anims.create({
      key: `${sprite} shoot`,
      frames: scene.anims.generateFrameNames(spriteSheet, {
        prefix: sprite.slice(0, -1),
        end: weaponFrames,
        zeroPad: 1,
      }),
      frameRate: 6000 / projectile.fireRate,
    });

    scene.anims.create({
      key: `${sprite} shoot destruction`,
      frames: scene.anims.generateFrameNames(spriteSheet, {
        prefix: destructionSprite.slice(0, -1),
        start: 0,
        end: destructionFrames,
        zeroPad: 1,
      }),
      frameRate: 15,
    });

    this.on(
      "animationcomplete",
      (e) => {
        if (e.key == "destruction") {
          this.setActive(false);
        }
      },
      this
    );
  }

  spawnShip(x, y) {
    const ship = this.getFirstDead(false);
    ship.enableBody(true, x, y, true, true);
    ship.health = this.health;
    ship.sprite = this.sprite;
  }

  shoot(ship, time, x, y) {
    if (time > ship.fireElapsedTime) {
      ship.fireElapsedTime = time + this.projectileGroup.projectile.fireRate;
      console.log(this.scene.anims);
      this.scene.anims.play(`${ship.sprite} shoot`, ship);
      this.projectileGroup.shootProjectile(x, y, "down");
    }
  }

  takeDamage(projectile, target) {
    if (projectile.data != null) {
      const amount = projectile.data.damage * projectile.scale;
      target.health -= amount;
      target.flashColor(0xffffff, 15 * amount);
      projectile.disableBody(true, true);

      if (target.health <= 0) {
        //  ship.anims.remove("shoot");
        console.log(this.scene.anims);
        this.scene.anims.play(`${target.sprite} destruction`, target);
        target.ship.body.checkCollision.none = true;
      }
    }
  }
}

class EnemyShip extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteSheet, sprite) {
    super(scene, x, y, spriteSheet, sprite);

    this.scene.physics.world.enable(this);
    this.body.setSize(this.frame.cutWidth, this.frame.cutHeight);
    this.setFlipY(true);
    this.fireElapsedTime = 0;
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
    this.fireElapsedTime = 0;
  }

  useWeapon(keySpace, time) {
    this.weapon.use(keySpace, time);
  }

  moveX(x) {
    this.ship.body.velocity.x = x;
  }

  moveY(y) {
    this.ship.body.velocity.y = y;
  }

  takeDamage(amount) {
    this.health -= amount;
    this.flashColor(this.scene, 0xffffff, 15 * amount);
    if (this.health <= 0) {
      this.ship.body.checkCollision.none = true;
    }
  }

  flashColor(scene, color, delay) {
    this.setTintFill(color);
    this.weapon.setTintFill(color);

    scene.time.delayedCall(delay, () => {
      this.clearTint();
      this.weapon.clearTint();
    });
  }
}
