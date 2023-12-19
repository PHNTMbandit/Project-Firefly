import EnemyGroup from "./ships";
import { getShip } from "./ships";

export default class WaveController {
  constructor(scene, player) {
    this.scene = scene;
    this.enemies = new EnemyGroup(scene, 100, getShip("Vaxtra Scout"));

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
      callback: () => this.spawnTriangle(4),
      delay: 4000,
      loop: true,
    });
  }

  spawnGrid(gridX, gridY) {
    const defaultSpacing = 15;
    const bounds = this.scene.physics.world.bounds;
    const spacingX = this.enemies.getFirst().body.width + defaultSpacing;
    const spacingY = this.enemies.getFirst().body.height + defaultSpacing;
    const minOffsetX = bounds.x + spacingX;
    const maxOffsetX = bounds.width - (gridX - 1) * spacingX - spacingX;
    const offsetX = Phaser.Math.FloatBetween(minOffsetX, maxOffsetX);
    const offsetY = bounds.y - spacingY * gridY;

    for (let y = 0; y < gridY; y++) {
      for (let x = 0; x < gridX; x++) {
        this.enemies.spawnShip(offsetX + x * spacingX, offsetY + y * spacingY);
      }
    }
  }

  spawnTriangle(gridSize) {
    const defaultSpacing = 15;
    const bounds = this.scene.physics.world.bounds;
    const spacingX = this.enemies.getFirst().body.width + defaultSpacing;
    const spacingY = this.enemies.getFirst().body.height + defaultSpacing;
    const minOffsetX = bounds.x + spacingX;
    const maxOffsetX = bounds.width - spacingX * (gridSize * 2 - 1);
    const offsetX = Phaser.Math.FloatBetween(minOffsetX, maxOffsetX);
    const offsetY = bounds.y - spacingY * gridSize;

    for (let y = 0; y < gridSize; y++) {
      for (let x = y; x < 2 * gridSize - y - 1; x++) {
        this.enemies.spawnShip(offsetX + x * spacingX, offsetY + y * spacingY);
      }
    }
  }
}
