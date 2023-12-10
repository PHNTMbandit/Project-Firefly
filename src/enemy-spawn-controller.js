function spawnEnemy() {
  const bounds = this.physics.world.bounds;
  const positionX = Phaser.Math.Between(bounds.x, bounds.x + bounds.width);
  const enemy = this.physics.add.sprite(positionX, bounds.y - 32, "enemy1");
  this.enemies.add(enemy);
}
