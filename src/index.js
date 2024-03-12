import { AUTO, Scale, Game } from "phaser";
import CollectsStars from "./scenes/CollectsStars-1";
import CollectsStars2 from "./scenes/CollectsStars-2";

const config = {
  type: AUTO,
  backgroundColor: "#32A5E7",
  scale: {
    width: 1920,
    height: 1080,
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
  scene: [CollectsStars2, CollectsStars],
};

/* eslint-disable-next-line */
export default new Game(config);
