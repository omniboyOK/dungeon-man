import "phaser";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  preload() {
    console.log('estamos en Title')

  }

  create() {
    this.add.image(400, 200, "logo");
  }
}
