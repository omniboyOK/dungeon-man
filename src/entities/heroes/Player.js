import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, map, collisionLayer) {
    super(scene, x, y, key);
    //referenciamos la escena donde creamos el personaje
    this.scene = scene;
    this.map = map;
    this.layer = collisionLayer;
    this.boundX = map.widthInPixels;
    this.boundY = map.heightInPixels;
    //los personajes son 16x16 vamos a usarlos como 32x32
    this.setScale(2, 2);
    this.camera = this.scene.cameras.main;
    this.camera.startFollow(this);
    this.camera.setLerp(0.1, 0.1);
    //Animaciones
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
    //cargamos las animaciones al personaje
    this.anims.load("idle");
    this.anims.load("running");

    this.play("idle");

    // Keyboard refs
    this.up = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.up.emitOnRepeat = false;
    this.down = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.down.emitOnRepeat = false;
    this.left = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.left.emitOnRepeat = false;
    this.right = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    this.right.emitOnRepeat = false;

    // This are the move keys for our player
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
    this.scene.add.existing(this);

    //touch inputs
    this.scene.rexGestures.add
      .swipe({
        enable: true,
        velocityThreshold: 1000,
        direction: "4dir"
      })
      .on(
        "swipe",
        swipe => {
          console.log("swipe swipe");
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

  //Manejo de animaciones
  //Hay que crear un manejador de estados que se encargue
  playRunningAnimation() {
    this.play("running");
    this.anims.chain("idle");
  }

  //Funciones del jugador
  moveUp() {
    let tile = this.layer.getTileAtWorldXY(this.x, this.y - 32, true)
      ? this.layer.getTileAtWorldXY(this.x, this.y - 32, true)
      : { properties: { block: true } };

    this.playRunningAnimation();
    if (tile.properties.block) {
    } else {
      this.y -= 32;
      this.checkBoundaries();
    }
  }

  moveDown() {
    let tile = this.layer.getTileAtWorldXY(this.x, this.y + 32, true)
      ? this.layer.getTileAtWorldXY(this.x, this.y + 32, true)
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
    let tile = this.layer.getTileAtWorldXY(this.x - 32, this.y, true)
      ? this.layer.getTileAtWorldXY(this.x - 32, this.y, true)
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
    let tile = this.layer.getTileAtWorldXY(this.x + 32, this.y, true)
      ? this.layer.getTileAtWorldXY(this.x + 32, this.y, true)
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
    //Previene al jugador irse fuera de los bordes de la pantalla
    //Cuando la pantalla tenga limites, esto no va a ser necesario
    this.x = Phaser.Math.Clamp(this.x, 16, this.boundX - 16);
    this.y = Phaser.Math.Clamp(this.y, 0, this.boundY - 32);
    this.depth = this.y + this.height / 2;
  }
}
