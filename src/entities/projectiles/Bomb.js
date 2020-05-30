import Phaser from "phaser";

export default class Bomb extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    // ---- This is for testing collitions without physic
    this.solid = true;
    // ---- Graphic
    this.setFrame("flask_big_blue.png");
    this.anims.
    // ---- Scene reference
    this.scene = scene;
    // ---- Assets are 32x32, we scale but may create custom sprisheet later
    this.setScale(2, 2);
    // ---- Add this to the current scene
    this.scene.add.existing(this);
    // ---- physic body --//
    this.scene.physics.add.existing(this, 0);
    this.body.setSize(10, 10)
    this.body.setOffset(3, 8)

    // ---- Initial behaviour
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
