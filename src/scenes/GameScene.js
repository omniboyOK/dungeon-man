import "phaser";
import Player from '../entities/heroes/Player';
import BigDemon from '../entities/monster/BigDemon';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    console.log('Bienvenido a Game') 
  }

  create() {
    let background = this.add.tileSprite(this.game.config.width * 0.5, this.game.config.height * 0.5, 256, 256, 'tilesheet', 'floor_1.png')
    background.setScale(2, 2);
    this.player = new Player(
      this,
      256,
      256,
      "characters"
    );

    this.demon = new BigDemon(
      this,
      284,
      256,
      "characters"
    );
  }

  update(){
    this.player.update()
  }
}