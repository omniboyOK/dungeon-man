import "phaser";
import logo from "../assets/logo.png";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("bootLogo", logo);

    //Una vez cargado los archivos basicos, 
    //agregamos un pequeño delay para el logo
    this.load.on(
      "complete",
      function() {
        this.time.delayedCall(
          2000,
          function() {
            this.scene.start("Preload");
          },
          [],
          this
        );
      }.bind(this)
    );
  }

  create() {
    console.log("yendo a preload");
    this.add.sprite(400, 300, "bootLogo");
  }
}
