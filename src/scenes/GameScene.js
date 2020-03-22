import "phaser";
import Player from "../entities/heroes/Player";
import BigDemon from "../entities/monster/BigDemon";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    console.log("Bienvenido a Game");
  }

  create() {
    const map = this.make.tilemap({ key: "basicLevel" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("dungeon", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createStaticLayer("Ground", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("Walls", tileset, 0, 0);
    const upperLayer = map.createStaticLayer("Overhead", tileset, 0, 0);

    this.player = new Player(this, 48, 96, "characters", map, worldLayer);

    this.demon = new BigDemon(this, 16*13 + 32, 16*5, "characters", map, worldLayer);
  }

  update() {}
}
