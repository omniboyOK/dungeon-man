import "phaser";
import GesturesPlugin from "../scripts/rexgesturesplugin.min.js";

const config = {
  // How the canvas will be rendered
  title: "DungeonMan",
  type: Phaser.CANVAS,
  width: 414,
  heigth: 736,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  pixelArt: true,
  // A background color
  backgroundColor: "black",
  dom: {
    createContainer: false
  },
  plugins: {
    scene: [
      {
        key: "rexGestures",
        plugin: GesturesPlugin,
        mapping: "rexGestures"
      }
    ]
  }
};

export default config;
