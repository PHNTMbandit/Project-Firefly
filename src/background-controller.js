export default class BackgroundController {
  constructor(scene) {
    this.backgroundLayer1 = scene.add.tileSprite(
      0,
      0,
      1920,
      1080,
      "Backgrounds",
      "Shadows 2/Starry background  - Layer 02 - Shadows 2-0"
    );

    this.backgroundLayer2 = scene.add.tileSprite(
      0,
      0,
      1920,
      1080,
      "Backgrounds",
      "Shadows/Starry background  - Layer 02 - Shadows-0"
    );

    this.backgroundLayer3 = scene.add.sprite(
      scene.game.config.width / 2,
      scene.game.config.height / 2,
      "Backgrounds",
      "Stars 2/Starry background  - Layer 03 - Stars 2-0"
    );

    this.backgroundLayer4 = scene.add.sprite(
      scene.game.config.width / 2,
      scene.game.config.height / 2,
      "Backgrounds",
      "Stars/Starry background  - Layer 03 - Stars-0"
    );

    this.backgroundLayer4.anims.create({
      key: "stars",
      frames: this.backgroundLayer4.anims.generateFrameNames("Backgrounds", {
        prefix: "Stars/Starry background  - Layer 03 - Stars-",
        end: 8,
        zeroPad: 1,
      }),
      repeat: -1,
      frameRate: 15,
    });

    this.backgroundLayer5 = scene.add.tileSprite(
      25,
      25,
      1920,
      1080,
      "Backgrounds",
      "Stars/Starry background  - Layer 03 - Stars-0"
    );

    this.backgroundLayer6 = scene.add.tileSprite(
      100,
      100,
      1920,
      1080,
      "Backgrounds",
      "Stars/Starry background  - Layer 03 - Stars-0"
    );

    this.backgroundLayer7 = scene.add.tileSprite(
      200,
      200,
      1920,
      1080,
      "Backgrounds",
      "Stars/Starry background  - Layer 03 - Stars-0"
    );

    this.backgroundLayer8 = scene.add.tileSprite(
      300,
      300,
      1920,
      1080,
      "Backgrounds",
      "Stars/Starry background  - Layer 03 - Stars-0"
    );

    this.backgroundLayer4.anims.play("stars");
  }

  updateBackgrounds() {
    this.backgroundLayer5.tilePositionY -= 0.04;
    this.backgroundLayer6.tilePositionY -= 0.2;
    this.backgroundLayer7.tilePositionY -= 0.9;
    this.backgroundLayer8.tilePositionY -= 2;
  }
}
