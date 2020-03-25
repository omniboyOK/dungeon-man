import Phaser from "phaser";

class OverlapPlugin {
  // -- receives the player and a group you want to test
  checkOverlapWithGroup(player, group) {
    group.getChildren().forEach(element => {
      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          player.getBounds(),
          element.getBounds()
        )
      ) {
          console.log('pepito')
        return true;
      }
    });
  }
}

const overlapPlugin = new OverlapPlugin();

export default overlapPlugin;
