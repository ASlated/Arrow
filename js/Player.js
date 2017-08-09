class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player');
    this.game = game;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(9, 15, 1);
    this.facing = 'right';
    this.scale.setTo(2, 2);
    this.anchor.setTo(0.5, 0.5)
    this.body.collideWorldBounds = true;

    this.walkingLeft = false;
    this.walkingRight = false;

    this.walkSpeed = 100;
    this.runSpeed = 150;
    this.jumpHeight = 200;
    this.jumpLength = 15;
    this.jumpTimer = this.jumpLength;

    this.flashTimer = 0;
    this.flashRate = 5;
    this.flashing = false;

    this.frames = {
      idle_right: 0,
      idle_left: 3,
      jump_right: 6,
      jump_left: 8,
      fall_right: 7,
      fall_left: 9,
    }
    this.animations.add('walk-right', [2, 0, 1, 0], 5);
    this.animations.add('walk-left', [5, 3, 4, 3], 5);
    this.animations.add('run-right', [2, 0, 1, 0], 7);
    this.animations.add('run-left', [5, 3, 4, 3], 7);

    this.game.add.existing(this);

    this.flash = this.flash.bind(this);
  }

  walk(facing) {
    this.facing = facing;
    if (this.running) {
      this.animations.play('run-' + this.facing);
    } else {
      this.animations.play('walk-' + this.facing);
    }
    if (this.running) {
      this.speed = this.runSpeed;
    } else {
      this.speed = this.walkSpeed;
    }
    if (this.facing == 'right') {
      this.body.velocity.x = this.speed;
    } else {
      this.body.velocity.x = -this.speed;
    }
  }

  halt() {
    this.animations.stop();
    this.frame = this.frames['idle_' + this.facing];
    this.body.velocity.x = 0;
  }

  jump() {
    if (this.body.blocked.down) {
      this.jumpTimer = 0;
      this.body.velocity.y = -this.jumpHeight;
    } else if (this.jumpTimer < this.jumpLength) {
      this.body.velocity.y = -this.jumpHeight;
    }
  }

  air() {
    this.jumpTimer++;
    if (this.body.velocity.y < 0) {
      this.frame = this.frames['jump_' + this.facing];
    } else {
      this.frame = this.frames['fall_' + this.facing];
    }
  }

  flash() {
    if (this.flashTimer < this.flashRate) {
      this.flashTimer++;
    } else {
      if (this.alpha == 1) {
        this.alpha = 0;
      } else {
        this.alpha = 1;
      }
      this.flashTimer = 0;
    }
  }
}

export default Player;
