import Phaser from "phaser";

export default class Bomb extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.setFrame("flask_big_blue.png");
    this.scene = scene;
    //los personajes son 16x16 vamos a usarlos como 32x32
    this.setScale(2, 2);

    this.scene.add.existing(this);
    this.scene.gr
    this.scene.time.addEvent({
      delay: 1500,
      callback: () => {
        this.destroy();
      },
      callbackScope: this,
      loop: false
    });

    
  }
}
