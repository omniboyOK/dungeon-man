import "phaser";
import LevelManager from '../scripts/LevelManager/LevelManager';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    console.log('estamos en Game')
  }

  create() {
  }
}