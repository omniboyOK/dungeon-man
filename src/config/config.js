import "phaser";

const config = {
  // How the canvas will be rendered
  title: "DungeonMan",
  type: Phaser.AUTO,
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
    createContainer: false,
}
};

export default config;
