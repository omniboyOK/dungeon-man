import Phaser from "phaser";

export default class Bomb extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    // ---- This is for testing collitions without physic
    this.solid = true;
    // ---- Scene reference
    this.scene = scene;
    // ---- Graphic
    // ---- Idle animation
    // ---- Idle animation
    this.scene.anims.create({
      key: "bomb_idle",
      frames: [
        { key: key, frame: "bomb_idle1" },
        { key: key, frame: "bomb_idle2" },
        { key: key, frame: "bomb_idle3" },
        { key: key, frame: "bomb_idle4" }
      ],
      frameRate: 4,
      repeat: -1
    });
    // ---- We load animations
    this.anims.load("bomb_idle");
    // ---- Set initial animation
    this.play("bomb_idle");
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
      delay: 2000,
      callback: () => {
        this.destroy();
      },
      callbackScope: this,
      loop: false
    });
  }
}
