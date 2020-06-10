import 'phaser';
import config from "./config/config";
import PreloadScene from "./scenes/PreloadScene";
import CreditsScene from "./scenes/CreditsScene";
import GameScene from "./scenes/GameScene";
import BootScene from "./scenes/BootScene";
import TitleScene from "./scenes/TitleScene";
import OptionsScene from "./scenes/OptionsScene";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Boot", BootScene);
    this.scene.add("Preload", PreloadScene);
    this.scene.add("Title", TitleScene);
    this.scene.add("Options", OptionsScene);
    this.scene.add("Credits", CreditsScene);
    this.scene.add("Game", GameScene);
    this.scene.start("Boot");
  }
}

window.game = new Game();
