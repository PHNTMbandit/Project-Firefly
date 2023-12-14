import Phaser from "phaser";
import World1 from "./world-1";

const config = {
  type: Phaser.AUTO,
  pixelArt: true,
  backgroundColor: "#2e222f",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game",
    width: 480,
    height: 320,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [World1],
};

export default new Phaser.Game(config);
