import Phaser from "phaser";
import Bomb from "../objects/bomb";

export default class Entity extends Phaser.GameObjects.Sprite {
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

    // ---- The Main camera, will follow the hero with smooth delay
    this.camera = this.scene.cameras.main;
    this.camera.startFollow(this);
    this.camera.setLerp(0.1, 0.1);

    // ---- Animations
    // ---- Idle animation
    this.scene.anims.create({
      key: "idle",
      frames: [
        { key: key, frame: "knight_f_idle_anim_f0.png" },
        { key: key, frame: "knight_f_idle_anim_f1.png" },
        { key: key, frame: "knight_f_idle_anim_f2.png" },
        { key: key, frame: "knight_f_idle_anim_f3.png" }
      ],
      frameRate: 8,
      repeat: -1
    });
    // ---- Running animation
    this.scene.anims.create({
      key: "running",
      frames: [
        { key: key, frame: "knight_f_run_anim_f0.png" },
        { key: key, frame: "knight_f_run_anim_f1.png" },
        { key: key, frame: "knight_f_run_anim_f2.png" },
        { key: key, frame: "knight_f_run_anim_f3.png" }
      ],
      frameRate: 8,
      repeat: 0
    });
    // ---- Jump animation
    this.scene.anims.create({
      key: "jump",
      frames: [
        { key: key, frame: "knight_f_hit_anim_f0.png" },
        { key: key, frame: "knight_f_hit_anim_f0.png" }
      ],
      frameRate: 8,
      repeat: 0
    });

    // ---- We load animations
    this.anims.load("idle");
    this.anims.load("running");
    // ---- Set initial animation
    this.play("idle");

    // ---- Keyboard referencies, this is for accessing properties
    this.up = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.down = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.left = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.right = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    this.space = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // ---- This prevents multiple inputs when holding the button
    this.up.emitOnRepeat = false;
    this.down.emitOnRepeat = false;
    this.left.emitOnRepeat = false;
    this.right.emitOnRepeat = false;
    this.space.emitOnRepeat = false;

    // ---- This are the events binded to our player keys
    this.scene.input.keyboard.on("keydown-W", event => {
      this.moveUp();
    });
    this.scene.input.keyboard.on("keydown-S", event => {
      this.moveDown();
    });
    this.scene.input.keyboard.on("keydown-A", event => {
      this.moveLeft();
    });
    this.scene.input.keyboard.on("keydown-D", event => {
      this.moveRight();
    });
    this.scene.input.keyboard.on("keydown-SPACE", event => {
      this.putBomb();
    });

    // ---- This add this graphic element and it's properties to the scene
    // It's important, as the entity has been declared but not added -- //
    this.scene.add.existing(this);

    // ---- Mobile Handling
    // ---- Touch Inputs for Mobile
    this.scene.rexGestures.add
      .swipe({
        enable: true,
        velocityThreshold: 1000,
        direction: "4dir"
      })
      .on(
        "swipe",
        swipe => {
          if (swipe.up) {
            this.moveUp();
          } else if (swipe.down) {
            this.moveDown();
          } else if (swipe.left) {
            this.moveLeft();
          } else if (swipe.right) {
            this.moveRight();
          }
        },
        this.scene
      );
  }

  // ---- Animation manager
  // ---- We need a FMS that take care of this for larger sprites
  playRunningAnimation() {
    this.play("running");
    this.anims.chain("idle");
  }

  // ---- Player functions
  // ---- Moving Up
  moveUp() {
    let tile = this.layer.getTileAtWorldXY(this.x, this.y - 32, true)
      ? this.layer.getTileAtWorldXY(this.x, this.y - 32, true)
      : { properties: { block: true } };

    this.playRunningAnimation();
    if (tile.properties.block) {
      // Do Nothing
    } else {
      this.y -= 32;
      this.checkBoundaries();
    }
  }
  // ---- Moving Down
  moveDown() {
    let tile = this.layer.getTileAtWorldXY(this.x, this.y + 32, true)
      ? this.layer.getTileAtWorldXY(this.x, this.y + 32, true)
      : { properties: { block: true } };

    this.playRunningAnimation();
    if (tile.properties.block) {
      // Do Nothing
    } else {
      this.y += 32;
      this.checkBoundaries();
    }
  }
  // ---- Moving Left
  moveLeft() {
    let tile = this.layer.getTileAtWorldXY(this.x - 32, this.y, true)
      ? this.layer.getTileAtWorldXY(this.x - 32, this.y, true)
      : { properties: { block: true } };

    this.playRunningAnimation();
    this.flipX = true;
    if (tile.properties.block) {
      // Do Nothing
    } else {
      this.x -= 32;
      this.checkBoundaries();
    }
  }
  // ---- Moving Right
  moveRight() {
    let tile = this.layer.getTileAtWorldXY(this.x + 32, this.y, true)
      ? this.layer.getTileAtWorldXY(this.x + 32, this.y, true)
      : { properties: { block: true } };
    this.playRunningAnimation();
    this.flipX = false;
    if (tile.properties.block) {
      // Do Nothing
    } else {
      this.x += 32;
      this.checkBoundaries();
    }
  }
  // ---- The player create a bomb
  putBomb() {
    let bomb = new Bomb(this.scene, this.x, this.y, this.texture);
  }

  // ---- Other
  // ---- With the bounds from the entity, it prevents falling outside the map.
  checkBoundaries() {
    this.x = Phaser.Math.Clamp(this.x, 16, this.boundX - 16);
    this.y = Phaser.Math.Clamp(this.y, 0, this.boundY - 32);
    this.depth = this.y + this.height / 2;
  }

}
