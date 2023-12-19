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
      callback: () => this.spawnGridFormation(3, 1),
      delay: 2500,
      loop: true,
    });
  }

  spawnOnHorizon(scene) {
    const bounds = this.scene.physics.world.bounds;
    const positionX = Phaser.Math.Between(bounds.x, bounds.x + bounds.width);
    const enemy = this.enemies.spawnShip(positionX, bounds.y - 32);

    this.tween = scene.tweens.add({
      targets: enemy.body.velocity,
      x: 50,
      duration: 2000,
      ease: "Cubic.easeInOut",
      repeat: -1,
      yoyo: true,
      loop: true,
    });
  }

  spawnGridFormation(gridX, gridY) {
    const defaultSpacing = 15;
    const bounds = this.scene.physics.world.bounds;
    const spacingX = this.enemies.getFirst().body.width + defaultSpacing;
    const spacingY = this.enemies.getFirst().body.height + defaultSpacing;
    const offsetY = bounds.y - spacingY;
    const minOffsetX = bounds.x + spacingX;
    const maxOffsetX = bounds.width - (gridX - 1) * spacingX - spacingX;
    const offsetX = Phaser.Math.FloatBetween(minOffsetX, maxOffsetX);

    for (let y = 0; y < gridY; y++) {
      for (let x = 0; x < gridX; x++) {
        const enemy = this.enemies.spawnShip(
          offsetX + x * spacingX,
          offsetY + y * spacingY
        );
        console.log(enemy.health);
      }
    }
  }
}
