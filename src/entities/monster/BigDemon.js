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

    this.anims.load("demon_idle");
    this.anims.load("demon_running");

    this.play("demon_idle");

    this.scene.add.existing(this);

    this.scene.time.addEvent({
      delay: 2000,
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
          case 3:
            this.moveLeft();
        }
      },
      callbackScope: this,
      loop: true
    });
  }

  playRunningAnimation() {
    this.play("demon_running");
    this.anims.chain("demon_idle");
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

  update() {
    this.x = Phaser.Math.Clamp(
      this.x,
      414 * 0.5 - 256 + 16,
      414 * 0.5 + 256 - 16
    );
    this.y = Phaser.Math.Clamp(
      this.y,
      736 * 0.5 - 256 + 16,
      736 * 0.5 + 256 - 16
    );
  }
}
