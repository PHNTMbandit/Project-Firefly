import { updateScoreText } from "./game-UI";

let score = 0;
export function addScore(amount) {
  score += amount;
  updateScoreText(score);
}

export function removeScore(amount) {
  score -= amount;
  updateScoreText(score);
}
