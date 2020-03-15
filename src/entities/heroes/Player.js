import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    //referenciamos la escena donde creamos el personaje
    this.scene = scene;
    //los personajes son 16x16 vamos a usarlos como 32x32
    this.setScale(2, 2);

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

    this.anims.load("idle");
    this.anims.load("running");

    this.play('idle');

    // Keyboard refs
    this.up = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.up.emitOnRepeat = false;
    this.down = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.down.emitOnRepeat = false;
    this.left = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.left.emitOnRepeat = false;
    this.right = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
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
  }

  playRunningAnimation() {
    this.play("running");
    this.anims.chain("idle");
  }

  moveUp() {
    this.playRunningAnimation();
    this.y -= 32;
  }
  moveDown() {
    this.playRunningAnimation();
    this.y += 32;
  }
  moveLeft() {
    this.playRunningAnimation();
    this.x -= 32;
    this.flipX = true;
  }
  moveRight() {
    this.playRunningAnimation();
    this.x += 32;
    this.flipX = false;
  }

  // On the update cycle, the body of the sprite will be rendered on new position
  update() {
    //This prevent the player to go out of bounds of the screen
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
  }
}
