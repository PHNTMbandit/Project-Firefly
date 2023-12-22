import AsteroidGroup from "./asteroid";
import EnemyGroup from "./ships";
import { getShip } from "./ships";

export var activeEnemies = [];

export function removeActiveEnemies(enemy) {
  activeEnemies = activeEnemies.filter((i) => i != enemy);
}

export default class WaveController {
  constructor(scene, player) {
    this.scene = scene;
    this.enemies = new EnemyGroup(scene, 100, getShip("Vaxtra Scout"));
    this.asteroids = new AsteroidGroup(scene, 50);

    scene.physics.add.overlap(
      this.asteroids,
      player.weapon.projectileGroup,
      player.weapon.projectileGroup.dealDamage,
      null,
      this
    );

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

    // scene.time.addEvent({
    //   callback: () => this.spawnGrid(1, 4, this.enemies, "Fly Straight"),
    //   delay: 6000,
    //   loop: true,
    // });

    scene.time.addEvent({
      callback: () => this.spawnGrid(3, 1, this.enemies, "Fly Diagonal"),
      delay: 8000,
      loop: true,
    });

    scene.time.addEvent({
      callback: () => this.spawnGrid(1, 1, this.asteroids, "Fly Straight"),
      delay: 4000,
      loop: true,
    });
  }

  updateEnemies(time) {
    if (activeEnemies.length > 0) {
      for (let i = 0; i < activeEnemies.length; i++) {
        this.enemies.shoot(
          activeEnemies[i],
          time,
          activeEnemies[i].x,
          activeEnemies[i].y
        );
      }
    }
  }

  spawnGrid(gridX, gridY, objectPool, AIStrategy) {
    const defaultSpacing = 15;
    const bounds = this.scene.physics.world.bounds;
    const spacingX = objectPool.getFirst().body.width + defaultSpacing;
    const spacingY = objectPool.getFirst().body.height + defaultSpacing;
    const minOffsetX = bounds.x + spacingX;
    const maxOffsetX = bounds.width - (gridX - 1) * spacingX - spacingX;
    const offsetX = Phaser.Math.FloatBetween(minOffsetX, maxOffsetX);
    const offsetY = bounds.y - spacingY * gridY;

    for (let y = 0; y < gridY; y++) {
      for (let x = 0; x < gridX; x++) {
        objectPool.spawn(
          offsetX + x * spacingX,
          offsetY + y * spacingY,
          AIStrategy
        );
      }
    }
  }

  spawnTriangle(gridSize, objectPool, AIStrategy) {
    const defaultSpacing = 15;
    const bounds = this.scene.physics.world.bounds;
    const spacingX = objectPool.getFirst().body.width + defaultSpacing;
    const spacingY = objectPool.getFirst().body.height + defaultSpacing;
    const minOffsetX = bounds.x + spacingX;
    const maxOffsetX = bounds.width - spacingX * (gridSize * 2 - 1);
    const offsetX = Phaser.Math.FloatBetween(minOffsetX, maxOffsetX);
    const offsetY = bounds.y - spacingY * gridSize;

    for (let y = 0; y < gridSize; y++) {
      for (let x = y; x < 2 * gridSize - y - 1; x++) {
        objectPool.spawn(
          offsetX + x * spacingX,
          offsetY + y * spacingY,
          AIStrategy
        );
      }
    }
  }
}
