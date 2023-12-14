export default class BackgroundController {
  constructor(scene) {
    this.backgroundLayer1 = scene.add.tileSprite(
      0,
      0,
      1920,
      1080,
      "Backgrounds",
      "Shadows/Starry background  - Layer 02 - Shadows 2-0"
    );

    this.backgroundLayer2 = scene.add.tileSprite(
      0,
      0,
      1920,
      1080,
      "Backgrounds",
      "Shadows/Starry background  - Layer 02 - Shadows-0"
    );

    this.backgroundLayer3 = scene.add.tileSprite(
      0,
      0,
      1920,
      1080,
      "Backgrounds",
      "Stars 2/Starry background  - Layer 03 - Stars 2-0"
    );

    this.backgroundLayer4 = scene.add.tileSprite(
      25,
      25,
      1920,
      1080,
      "Backgrounds",
      "Stars/Starry background  - Layer 03 - Stars-0"
    );

    this.backgroundLayer5 = scene.add.tileSprite(
      100,
      100,
      1920,
      1080,
      "Backgrounds",
      "Stars/Starry background  - Layer 03 - Stars-0"
    );

    this.backgroundLayer6 = scene.add.tileSprite(
      200,
      200,
      1920,
      1080,
      "Backgrounds",
      "Stars/Starry background  - Layer 03 - Stars-0"
    );

    this.backgroundLayer7 = scene.add.tileSprite(
      300,
      300,
      1920,
      1080,
      "Backgrounds",
      "Stars/Starry background  - Layer 03 - Stars-0"
    );
  }

  updateBackgrounds() {
    this.backgroundLayer1.tilePositionY -= 0.01;
    this.backgroundLayer2.tilePositionY -= 0.02;
    this.backgroundLayer3.tilePositionY -= 0.04;
    this.backgroundLayer4.tilePositionY -= 0.04;
    this.backgroundLayer5.tilePositionY -= 0.5;
    this.backgroundLayer6.tilePositionY -= 1.5;
    this.backgroundLayer7.tilePositionY -= 2;
  }
}
