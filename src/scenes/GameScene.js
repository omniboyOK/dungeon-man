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
    const map = this.make.tilemap({ key: "level1" });
    console.log(map.widthInPixels);

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("dungeon", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createStaticLayer("Ground", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("Walls", tileset, 0, 0);
    const deepLayer = map.createStaticLayer("Free fall", tileset, 0, 0);

    // The 13th tile through and including the 45th tile will be marked as colliding
    map.setCollisionByProperty({ collides: true })
    this.player = new Player(
      this,
      16,
      32,
      "characters",
      map.widthInPixels,
      map.heightInPixels
    );

    this.demon = new BigDemon(
      this,
      48,
      24,
      "characters",
      map.widthInPixels,
      map.heightInPixels
    );

    const debugGraphics = this.add.graphics().setAlpha(0.50);
    map.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  }

  update() {
    
  }
}
