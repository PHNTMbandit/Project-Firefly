const projectiles = [
  {
    ID: 0,
    name: "Auto Cannon Bullet",
    projectileType: "Projectile",
    damage: 5,
    speed: 350,
    spriteSheet: "projectiles",
    sprite: "Bullet/Main ship weapon - Projectile - Auto cannon bullet-0",
    frames: 3,
  },
  {
    ID: 1,
    name: "Big Bullet",
    projectileType: "Projectile",
    damage: 5,
    speed: 500,
    spriteSheet: "Kla'ed",
    sprite: "Projectiles/Big Bullet/Kla'ed - Big Bullet-0",
    frames: 3,
  },
  {
    ID: 2,
    name: "Bullet",
    projectileType: "Projectile",
    damage: 5,
    speed: 500,
    spriteSheet: "Kla'ed",
    sprite: "Projectiles/Bullet/Kla'ed - Bullet-0",
    frames: 7,
  },
  {
    ID: 3,
    name: "Energy Ball",
    projectileType: "Projectile",
    damage: 10,
    speed: 350,
    spriteSheet: "projectiles",
    sprite: "Energy Ball/Main ship weapon - Projectile - Big Space Gun-0",
    frames: 9,
  },
  {
    ID: 4,
    name: "Laser Beam",
    projectileType: "Beam",
    damage: 0.1,
    spriteSheet: "projectiles",
    sprite: "Laser Beam/Main ship weapon - Projectile - Zapper-0",
    frames: 7,
  },
  {
    ID: 5,
    name: "Rocket",
    projectileType: "Projectile",
    damage: 5,
    speed: 350,
    spriteSheet: "projectiles",
    sprite: "Rocket/Main ship weapon - Projectile - Rocket-0",
    frames: 2,
  },
  {
    ID: 6,
    name: "Torpedo",
    projectileType: "Projectile",
    damage: 5,
    speed: 350,
    spriteSheet: "Kla'ed",
    sprite: "Projectiles/Torpedo/Kla'ed - Torpedo-0",
    frames: 2,
  },
  {
    ID: 7,
    name: "Wave",
    projectileType: "Projectile",
    damage: 5,
    speed: 350,
    spriteSheet: "Kla'ed",
    sprite: "Projectiles/Wave/Kla'ed - Wave-0",
    frames: 5,
  },
];

export var getProjectile = function (name) {
  return projectiles.find((i) => i.name == name);
};

export var getProjectileBySprite = function (sprite) {
  return projectiles.find((i) => i.sprite === sprite);
};

export var getProjectileGroup = function (scene, projectile, amount) {
  if (projectile.projectileType == "Projectile") {
    return new ProjectileGroup(scene, projectile, amount);
  } else if (projectile.projectileType == "Beam") {
    return new BeamGroup(scene, projectile, amount);
  }
};

class BeamGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene, { spriteSheet, sprite, frames }, amount) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Beam,
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
    return this.children.getArray().at(index);
  }

  dealDamage(target, projectile) {
    projectile.dealDamage(target);
  }
}

class ProjectileGroup extends Phaser.Physics.Arcade.Group {
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

  getProjectile() {
    return this.getFirstDead(false);
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
  constructor(scene, x, y, spriteSheet, sprite) {
    super(scene, x, y, spriteSheet, sprite);

    scene.physics.add.existing(this);
    this.body.setSize(this.frame.cutWidth, this.frame.cutHeight);

    const projectileData = getProjectileBySprite(sprite);
    this.damage = projectileData.damage;
    this.speed = projectileData.speed;
    this.sprite = projectileData.sprite;
  }

  activate(x, y) {
    this.anims.play(`${this.sprite} shoot`, true);
    this.scaleY = 10;
    this.setOrigin(0.5, 1);
    this.enableBody(true, x, y, true, true);
  }

  deactivate() {
    this.disableBody(true, true);
  }

  dealDamage(target) {
    const amount = this.damage;

    if (target.type == "Container") {
      target.last.flashColor(0xffffff, 15 * amount);
      target.last.takeDamage(amount);
    } else {
      target.flashColor(0xffffff, 15 * amount);
      target.takeDamage(amount);
    }
  }
}
