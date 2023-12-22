let healthText;
let scoreText;

export function initialiseUI(scene, player) {
  healthText = scene.add.bitmapText(
    10,
    25,
    "pressStart2P",
    `HEALTH: ${player.health}`,
    8,
    "left"
  );
  scoreText = scene.add.bitmapText(
    10,
    10,
    "pressStart2P",
    "SCORE: 0",
    8,
    "left"
  );

  healthText.setTintFill(0xffffff);
  scoreText.setTintFill(0xffffff);
}

export function updateHealthText(health) {
  healthText.setText(`HEALTH: ${health}`);
}

export function updateScoreText(score) {
  scoreText.setText(`SCORE: ${score}`);
}
