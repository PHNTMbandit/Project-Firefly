const projectiles = [
  {
    name: "Auto Cannon Bullet",
    damage: 5,
    fireRate: 200,
    speed: 350,
    spriteSheet: "projectiles",
    sprite: "Bullet/Main ship weapon - Projectile - Auto cannon bullet-0",
    frames: 3,
  },
  {
    name: "Energy Ball",
    damage: 10,
    speed: 350,
    spriteSheet: "projectiles",
    sprite: "Energy Ball/Main ship weapon - Projectile - Big Space Gun-0",
    frames: 9,
  },
  {
    name: "Laser Beam",
    damage: 10,
    spriteSheet: "projectiles",
    sprite: "Laser Beam/Main ship weapon - Projectile - Zapper-0",
    frames: 7,
  },
  {
    name: "Rocket",
    damage: 5,
    fireRate: 600,
    speed: 350,
    spriteSheet: "projectiles",
    sprite: "Rocket/Main ship weapon - Projectile - Rocket-0",
    frames: 2,
  },
  {
    name: "Vaxtra Bullet",
    damage: 5,
    fireRate: 700,
    speed: 500,
    spriteSheet: "Kla'ed",
    sprite: "Projectiles/Bullet/Kla'ed - Bullet-0",
    frames: 7,
  },
  {
    name: "Vaxtra Big Bullet",
    damage: 5,
    fireRate: 700,
    speed: 500,
    spriteSheet: "Kla'ed",
    sprite: "Projectiles/Big Bullet/Kla'ed - Big Bullet-0",
    frames: 3,
  },
];

export var getProjectile = function (name) {
  return projectiles.find((i) => i.name == name);
};

export var getProjectileBySprite = function (sprite) {
  return projectiles.find((i) => i.sprite === sprite);
};

export default class ProjectileGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, { spriteSheet, sprite, frames }, amount) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Projectile,
      key: spriteSheet,
      frame: sprite,
      frameQuantity: amount,
      active: false,
      visible: false,
      "setXY.x": 1000,
      "setXY.y": 1000,
    });

    scene.anims.create({
      key: `${sprite} shoot`,
      frames: scene.anims.generateFrameNames(spriteSheet, {
        prefix: sprite.slice(0, -1),
        end: frames,
        zeroPad: 1,
      }),
      frameRate: 15,
      repeat: -1,
      showOnStart: true,
    });
  }

  getProjectile(index) {
    if (index != null) {
      return this.children.getArray().at(index);
    } else {
      return this.getFirstDead(false);
    }
  }

  dealDamage(target, projectile) {
    projectile.dealDamage(target);
  }
}

class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteSheet, sprite) {
    super(scene, x, y, spriteSheet, sprite);

    scene.physics.add.existing(this);
    this.body.setSize(this.frame.cutWidth, this.frame.cutHeight);

    const projectileData = getProjectileBySprite(sprite);
    this.damage = projectileData.damage;
    this.speed = projectileData.speed;
    this.sprite = projectileData.sprite;
  }

  shootProjectile(x, y, direction, scale) {
    this.anims.play(`${this.sprite} shoot`);
    this.setScale(scale);
    this.enableBody(true, x, y, true, true);

    if (direction == "up") {
      this.setVelocityY(-this.speed);
    } else if (direction == "down") {
      this.setFlipY(true);
      this.setVelocityY(this.speed);
    }
  }

  dealDamage(target) {
    this.disableBody(true, true);
    const amount = this.damage * this.scale;

    if (target.type == "Container") {
      target.last.flashColor(0xffffff, 15 * amount);
      target.last.takeDamage(amount);
    } else {
      target.flashColor(0xffffff, 15 * amount);
      target.takeDamage(amount);
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y <= 0 || this.y >= this.scene.scale.height + 50) {
      this.disableBody(true, true);
    }
  }
}

class Beam extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteSheet, spriteName) {
    super(scene, x, y, spriteSheet, spriteName);
  }
}
