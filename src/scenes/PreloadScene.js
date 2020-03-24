import "phaser";
import charSheet from "../assets/char/spritesheet.png";
import charAtlas from "../assets/char/spritesheet.json";
import tiles from "../assets/tiles/spritesheetx32.png";
import level1JSON from "../assets/tiles/level1.json";
import basicLevel from "../assets/tiles/basicLevel.json";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    // barra de progeso
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(50, 270, this.game.config.width / 2 + 100, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff"
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff"
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff"
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // actualiza la barra de progreso
    this.load.on("progress", function(value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(55, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on("fileprogress", function(file) {
      assetText.setText("Loading asset: " + file.key);
    });

    // remove progress bar when complete
    this.load.on(
      "complete",
      function() {
        this.time.delayedCall(
          2000,
          function() {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.ready();
          },
          [],
          this
        );
      }.bind(this)
    );

    // load assets needed in our game
    this.load.atlas("characters", charSheet, charAtlas);
    this.load.image("tiles", tiles);
    this.load.tilemapTiledJSON("level1", level1JSON);
    this.load.tilemapTiledJSON("basicLevel", basicLevel);
  }

  create() {
    // ---- [debug] For debbuging purposes
    console.log("Welcome to Preload");
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount++;
    if (this.readyCount === 1) {
      this.scene.start("Game");
    }
  }
}
