import EnemyGroup from "./ships";
import { getShip } from "./ships";

export default class WaveController {
  constructor(scene, player) {
    this.scene = scene;
    this.enemies = new EnemyGroup(scene, 10, getShip("Vaxtra Scout"));

    scene.physics.add.overlap(
      this.enemies,
      player.weapon.projectileGroup,
      player.weapon.projectileGroup.dealDamage,
      null,
      this
    );

    scene.physics.add.overlap(
      player.ship,
      this.enemies.projectileGroup,
      this.enemies.projectileGroup.dealDamage,
      null,
      this
    );

    scene.time.addEvent({
      callback: () => this.spawnOnHorizon(scene),
      delay: 2000,
      loop: true,
    });
  }

  spawnOnHorizon(scene) {
    console.log("spawn");
    const bounds = this.scene.physics.world.bounds;
    const positionX = Phaser.Math.Between(bounds.x, bounds.x + bounds.width);
    this.enemies.spawnShip(positionX, bounds.y - 32);
  }

  spawnGridFormation(gridX, gridY) {
    const defaultSpacing = 15;
    for (let y = 0; y < gridY; y++) {
      for (let x = 0; x < gridX; x++) {
        const spacingX = this.enemies.getFirst().body.width + defaultSpacing;
        const spacingY = this.enemies.getFirst().body.height + defaultSpacing;

        const offsetX =
          (this.scene.game.canvas.width - (gridX - 1) * spacingX) / 2;
        const offsetY =
          (this.scene.game.canvas.height - (gridY - 1) * spacingY) / 4;

        this.enemies.spawnShip(offsetX + x * spacingX, offsetY + y * spacingY);
      }
    }
  }
}
