import Phaser from "phaser";
import Fire from './Fire';
export default class Bomb extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    // ---- This is for testing collitions without physic
    this.solid = true;
    this.power = 1;
    // ---- Graphic
    this.setFrame("flask_big_blue.png");
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
        this.explosion(1);
        this.destroy();
      },
      callbackScope: this,
      loop: false
    });
  }

  explosion(size) {
      let explosion = new Fire(this.scene, this.x-32, this.y+4, 'projectiles');
      let explosion2 = new Fire(this.scene, this.x+32, this.y+4, 'projectiles');
  }
}
