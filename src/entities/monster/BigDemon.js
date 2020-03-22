import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, map) {
    super(scene, x, y, key);
    //referenciamos la escena donde creamos el personaje
    this.scene = scene;
    this.map = map;
    this.boundX = map.widthInPixels;
    this.boundY = map.heightInPixels;
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

    //default event
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
    this.playRunningAnimation();
    this.y -= 32;
    this.checkBoundaries();
  }

  moveDown() {
    this.playRunningAnimation();
    this.y += 32;
    this.checkBoundaries();
  }

  moveLeft() {
    this.playRunningAnimation();
    this.x -= 32;
    this.flipX = true;
    this.checkBoundaries();
  }

  moveRight() {
    this.playRunningAnimation();
    this.x += 32;
    this.flipX = false;
  }

  checkBoundaries() {
    //Previene al jugador irse fuera de los bordes de la pantalla
    //Cuando la pantalla tenga limites, esto no va a ser necesario
    this.x = Phaser.Math.Clamp(this.x, 16, this.boundX - 16);
    this.y = Phaser.Math.Clamp(this.y, 0, this.boundY - 32);
    this.depth = this.y + this.height / 2;
  }
}
