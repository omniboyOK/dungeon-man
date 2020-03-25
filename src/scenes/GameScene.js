import "phaser";
import Player from "../entities/heroes/Player";
import BigDemon from "../entities/monster/BigDemon";
import OverlapPlugin from "../scripts/spriteoverlapplugin";

var bombGroup;
var EnemyGroup;
var player;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    // ---- [debug] For debbuging purposes
    console.log("Welcome to Game");
  }

  create() {
    // TILEMAP
    // ---- Tilemap made with preloaded JSON
    const map = this.make.tilemap({ key: "basicLevel" });
    // -- Adding graphic to the tilemap, referencing the Tiled
    // scenary (dungeon) and the spritesheet key (tiles) -- //
    const tileset = map.addTilesetImage("dungeon", "tiles");
    // ---- Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createStaticLayer("Ground", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("Walls", tileset, 0, 0);
    const upperLayer = map.createStaticLayer("Overhead", tileset, 0, 0);
    // ---- Setting Overlapping layer with the maximun depth
    // so it always shows over all dinamic entities ---- //
    upperLayer.setDepth(map.heightInPixels);

    // ENTITIES
    // ---- All entity groups
    EnemyGroup = this.add.group();
    // ---- All created entities
    player = new Player(this, 48, 96, "characters", map, worldLayer);
    this.demon = new BigDemon(
      this,
      16 * 13 + 32,
      16 * 5,
      "characters",
      map,
      worldLayer
    );
    this.demon2 = new BigDemon(
      this,
      16 * 15 + 32,
      16 * 7,
      "characters",
      map,
      worldLayer
    );
    EnemyGroup.addMultiple([this.demon, this.demon2]);
    

    //var check = Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.demon.getBounds());
  }

  update() {
    /*if(OverlapPlugin.checkOverlapWithGroup(player, EnemyGroup)){
      console.log('pepito')
    };*/
  }
}
