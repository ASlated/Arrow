class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player', 0);
    this.game = game;
    this.walkSpeed = 100;
    this.runSpeed = 200;
    this.jumpHeight = 200;
    this.scale.setTo(2, 2);
    this.facing = 'right';
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.game.add.existing(this);
    // debugger;
    this.frames = {
      idle_right: 0,
      idle_left: 3,
      jump_right: 6,
      jump_left: 8,
      fall_right: 7,
      fall_left: 9,
    }
    this.animations.add('walk-right', [2, 0, 1, 0], 7);
    this.animations.add('walk-left', [5, 3, 4, 3], 7);
  }

  walk(facing) {
    this.facing = facing;
    this.animations.play('walk-' + this.facing);
    if (this.running) {
      this.speed = this.runSpeed;
    } else {
      this.speed = this.walkSpeed;
    }
    if (this.facing == 'right') {
      this.body.velocity.x = this.speed
    } else {
      this.body.velocity.x = -this.speed
    }
  }

  halt() {
    this.animations.stop();
    this.frame = this.frames['idle_' + this.facing];
    this.body.velocity.x = 0;
  }

  jump() {
    if (this.body.blocked.down) {
      this.jumptimer = 1;
      this.body.velocity.y = -this.jumpHeight;
    } else if (this.jumptimer != 0) {
      if (this.jumptimer > 15) {
        this.jumptimer = 0;
      } else {
        this.jumptimer++;
        this.body.velocity.y = -this.jumpHeight;
      }
    } else if (this.jumptimer != 0) {
      this.jumptimer = 0;
    }
  }

  air() {
    if (this.body.velocity.y < 0) {
      this.frame = this.frames['jump_' + this.facing];
    } else {
      this.frame = this.frames['fall_' + this.facing];
    }
  }
}

export default Player;
