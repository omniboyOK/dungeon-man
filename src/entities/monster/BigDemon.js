import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, map, collisionLayer) {
    super(scene, x, y, key);
    // ---- Map references
    this.scene = scene;
    this.map = map;
    // ---- This references the "Walls" layer that contains solid blocks
    this.layer = collisionLayer;
    // -- This set the map bounds for this entity
    this.boundX = map.widthInPixels;
    this.boundY = map.heightInPixels;

    // ---- Assets are 32x32, we scale but may create custom sprisheet later
    this.setScale(2, 2);

    // ---- Animations
    // ---- Idle animation
    this.scene.anims.create({
      key: "demon_idle",
      frames: [
        { key: key, frame: "big_demon_idle_anim_f0.png" },
        { key: key, frame: "big_demon_idle_anim_f1.png" },
        { key: key, frame: "big_demon_idle_anim_f2.png" },
        { key: key, frame: "big_demon_idle_anim_f3.png" }
      ],
      frameRate: 8,
      repeat: -1
    });
    // ---- Running animation
    this.scene.anims.create({
      key: "demon_running",
      frames: [
        { key: key, frame: "big_demon_run_anim_f0.png" },
        { key: key, frame: "big_demon_run_anim_f1.png" },
        { key: key, frame: "big_demon_run_anim_f2.png" },
        { key: key, frame: "big_demon_run_anim_f3.png" }
      ],
      frameRate: 8,
      repeat: 0
    });
    // ---- We load animations
    this.anims.load("demon_idle");
    this.anims.load("demon_running");
    // ---- Set initial animation
    this.play("demon_idle");

    // ---- This add this graphic element and it's properties to the scene
    // It's important, as the entity has been declared but not added -- //
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, 0);
    // ---- physic body --//
    this.body.setSize(10, 10);
    this.body.setOffset(12, 28);

    //default event
    this.scene.time.addEvent({
      delay: 1500,
      callback: () => {
        let randomNumber = Math.floor(Math.random() * 4);
        switch (randomNumber) {
          case 0:
            this.moveUp();
            break;
          case 1:
            this.moveDown();
            break;
          case 2:
            this.moveRight();
            break;
          case 3:
            this.moveLeft();
            break;
        }
      },
      callbackScope: this,
      loop: true
    });
  }

  switchEvent(event) {}

  playRunningAnimation() {
    this.play("demon_running");
    this.anims.chain("demon_idle");
    this.checkBoundaries();
  }

  moveUp() {
    let tile = this.layer.getTileAtWorldXY(this.x, this.y, true)
      ? this.layer.getTileAtWorldXY(this.x, this.y, true)
      : { properties: { block: true } };

    this.playRunningAnimation();
    if (tile.properties.block) {
    } else {
      this.y -= 32;
      this.checkBoundaries();
    }
  }

  moveDown() {
    let tile = this.layer.getTileAtWorldXY(this.x, this.y + 64, true)
      ? this.layer.getTileAtWorldXY(this.x, this.y + 64, true)
      : { properties: { block: true } };

    this.playRunningAnimation();
    if (tile.properties.block) {
      //  Blocked, we can't move
    } else {
      this.y += 32;
      this.checkBoundaries();
    }
  }

  moveLeft() {
    let tile = this.layer.getTileAtWorldXY(this.x - 32, this.y - 32, true)
      ? this.layer.getTileAtWorldXY(this.x - 32, this.y - 32, true)
      : { properties: { block: true } };

    this.playRunningAnimation();
    this.flipX = true;
    if (tile.properties.block) {
    } else {
      this.x -= 32;
      this.checkBoundaries();
    }
  }

  moveRight() {
    let tile = this.layer.getTileAtWorldXY(this.x + 32, this.y - 32, true)
      ? this.layer.getTileAtWorldXY(this.x + 32, this.y - 32, true)
      : { properties: { block: true } };

    this.playRunningAnimation();
    this.flipX = false;
    if (tile.properties.block) {
    } else {
      this.x += 32;
      this.checkBoundaries();
    }
  }

  checkBoundaries() {
    this.x = Phaser.Math.Clamp(this.x, 16, this.boundX - 16);
    this.y = Phaser.Math.Clamp(this.y, 0, this.boundY - 32);
    this.depth = this.y + this.height / 2;
  }
}
