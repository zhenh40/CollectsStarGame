import { Scene } from "phaser";

export default class ColletsStars2 extends Scene {
  constructor() {
    super("colects-star-scene");
  }
  init() {
    this.platforms = [];
    this.player = undefined;
    this.stars = undefined;
    this.cursor = undefined;
    this.scoreText = undefined;
    this.score = 0;
    this.bomb = undefined;
  }

  preload() {
    this.load.image("ground", "images/platform.png");
    this.load.image("star", "images/crystal-2.png");
    this.load.image("sky", "images/back.png");
    this.load.image("bomb", "images/bomb.png");

    this.load.spritesheet("dude", "images/dude.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.audio("soundrop", "sfx/jumpdrop.mp3");
    this.load.audio("bombsound", "sfx/bombmeleduk.wav");
    this.load.audio("death", "sfx/death.wav");
    this.load.audio("bgsound", "sfx/Path to Lake Land.ogg");
  }

  create() {
    this.add.image(850, 500, "sky").setScale(4.8);
    this.player = this.physics.add.sprite(200, 900, "dude").setScale(4);

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(300, 400, "ground").setScale(2.5).refreshBody();
    this.platforms.create(1550, 700, "ground").setScale(2.5).refreshBody();
    this.platforms.create(350, 1000, "ground").setScale(2.5).refreshBody();
    this.platforms.create(600, 1000, "ground").setScale(2.5).refreshBody();

    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.platforms);

    this.stars = this.physics.add.group({
      key: "star",
      repeat: 10,
      setXY: { x: 50, y: 0, stepX: 160 },
    });

    this.bomb = this.physics.add.group({
      key: "bomb",
      repeat: 30,
      setXY: { x: 130, y: 0, stepX: 120 },
    });

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bomb, this.platforms);

    this.stars.children.iterate(function (child) {
      child.setBounceY(0.5).setScale(1.5);
    });

    this.bomb.children.iterate(function (child) {
      child.setBounceY(0.5).setScale(1.9);
    });

    this.cursor = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 5 }],
      frameRate: 20,
    });

    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );

    this.physics.add.overlap(this.player, this.bomb, this.gameOver, null, this);

    this.scoreText = this.add.text(16, 16, "Score : 0", {
      fontSize: "32px",
      fill: "yellow",
    });

    this.cursor = this.input.keyboard.createCursorKeys();

    this.backsound = this.sound.add("bgsound");
    var soundConfig = {
      loop: true,
      volume: 0.5,
    };
    this.backsound.play(soundConfig);
  }

  update() {
    if (this.cursor.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play("run", true);
      this.player.setFlipX(true);
    } else if (this.cursor.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play("run", true);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocity(0, 0);
      this.player.anims.play("turn");
    }

    if (this.cursor.up.isDown) {
      this.player.setVelocityY(-200);
      this.player.anims.play("turn");
    }

    if (this.cursor.up.isUp) {
      this.player.setVelocityY(400);
    }

    if (this.score >= 100) {
      this.physics.pause();
      // this.add.text(1920 / 2 - 200, 1080 / 2, "You Win!!!", {
      //   fontSize: "48px",
      //   fill: "yellow",
      // });
      this.scene.start("collects-star-scene-2");
    }
  }
  collectStar(player, star) {
    star.destroy();

    this.score += 10;
    this.scoreText.setText("Score : " + this.score);
  }

  gameOver() {
    this.physics.pause();
    this.add.text(1920 / 2 - 200, 1080 / 2, "Game Over!!!", {
      fontSize: "48px",
      fill: "yellow",
    });
  }
}
