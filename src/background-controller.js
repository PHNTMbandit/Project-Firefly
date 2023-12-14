export default class BackgroundController {
  constructor(scene) {
    this.shadows = scene.add.tileSprite(
      0,
      0,
      1920,
      1080,
      "Backgrounds",
      "Shadows 2/Starry background  - Layer 02 - Shadows 2-0"
    );

    this.shadows2 = scene.add.tileSprite(
      0,
      0,
      1920,
      1080,
      "Backgrounds",
      "Shadows/Starry background  - Layer 02 - Shadows-0"
    );

    // this.bigStar = scene.add.sprite(
    //   600,
    //   175,
    //   "Backgrounds",
    //   "Big Star/Starry background - Layer X - Big Star-0"
    // );

    // this.bigStar.anims.create({
    //   key: "shine",
    //   frames: this.bigStar.anims.generateFrameNames("Backgrounds", {
    //     prefix: "Big Star/Starry background - Layer X - Big Star-",
    //     end: 8,
    //     zeroPad: 1,
    //   }),
    //   repeat: -1,
    //   frameRate: 15,
    // });

    this.rotaryStar2 = scene.add.sprite(
      190,
      400,
      "Backgrounds",
      "Rotary Star 2/Starry background - Layer X -Rotary Star 2-0"
    );

    this.rotaryStar2.anims.create({
      key: "shine",
      frames: this.rotaryStar2.anims.generateFrameNames("Backgrounds", {
        prefix: "Rotary Star 2/Starry background - Layer X -Rotary Star 2-",
        end: 8,
        zeroPad: 1,
      }),
      repeat: -1,
      frameRate: 15,
    });

    this.bigStar2 = scene.add.sprite(
      300,
      175,
      "Backgrounds",
      "Big Star 2/Starry background - Layer X - Big Star 2-0"
    );

    this.bigStar2.anims.create({
      key: "shine",
      frames: this.bigStar2.anims.generateFrameNames("Backgrounds", {
        prefix: "Big Star 2/Starry background - Layer X - Big Star 2-",
        end: 8,
        zeroPad: 1,
      }),
      repeat: -1,
      frameRate: 15,
    });

    this.stars = scene.add.sprite(
      scene.game.config.width / 2,
      scene.game.config.height / 2,
      "Backgrounds",
      "Stars 2/Starry background  - Layer 03 - Stars 2-0"
    );

    this.stars2 = scene.add.sprite(
      scene.game.config.width / 2,
      scene.game.config.height / 2,
      "Backgrounds",
      "Stars/Starry background  - Layer 03 - Stars-0"
    );

    this.stars2.anims.create({
      key: "stars",
      frames: this.stars2.anims.generateFrameNames("Backgrounds", {
        prefix: "Stars/Starry background  - Layer 03 - Stars-",
        end: 8,
        zeroPad: 1,
      }),
      repeat: -1,
      frameRate: 15,
    });

    this.stars3 = scene.add.tileSprite(
      25,
      25,
      1920,
      1080,
      "Backgrounds",
      "Stars/Starry background  - Layer 03 - Stars-0"
    );

    this.planet = scene.add.sprite(100, 100, "Planet", "Earth-Like planet-0");
    this.planet.anims.create({
      key: "spin",
      frames: this.planet.anims.generateFrameNames("Planet", {
        prefix: "Earth-Like planet-",
        end: 76,
        zeroPad: 1,
      }),
      repeat: -1,
      frameRate: 1,
    });

    this.stars4 = scene.add.tileSprite(
      100,
      100,
      1920,
      1080,
      "Backgrounds",
      "Stars/Starry background  - Layer 03 - Stars-0"
    );

    this.stars5 = scene.add.tileSprite(
      200,
      200,
      1920,
      1080,
      "Backgrounds",
      "Stars/Starry background  - Layer 03 - Stars-0"
    );

    // this.backgroundLayer8 = scene.add.tileSprite(
    //   300,
    //   300,
    //   1920,
    //   1080,
    //   "Backgrounds",
    //   "Stars/Starry background  - Layer 03 - Stars-0"
    // );

    this.rotaryStar2.anims.play("shine");
    this.stars2.anims.play("stars");
    this.planet.anims.play("spin");
    this.bigStar2.anims.play("shine");
  }

  updateBackgrounds() {
    this.stars3.tilePositionY -= 0.1;
    this.stars4.tilePositionY -= 0.6;
    this.stars5.tilePositionY -= 1.2;
    //this.backgroundLayer8.tilePositionY -= 1.2;
  }
}
