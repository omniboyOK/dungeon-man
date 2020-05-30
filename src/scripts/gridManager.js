import Phaser from "phaser";

class GridManager {
  constructor(tilemap, width, height, entityArray){
    super(tilemap, width, height, entityArray)
    this.map = tilemap;
    this.width = width;
    this.height = height;
    this.group = entityArray;

    // -- create table
    this.grid = createGrid(this.width, this.height);
  };
  
  createGrid(width, height) {
    let grid = []
    for(var i = 0; i < height; i++){
      
    }
  }

  updateChessPosition(chess, [x, y]){

  }
}

export default GridManager;
