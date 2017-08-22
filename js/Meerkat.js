import Enemy from './Enemy.js';

class Meerkat extends Enemy {
  constructor(game, x, y) {
    super(game, x, y, 'meerkat', 10);
    this.game = game;
    this.body.setSize(6, 16, 0);
    this.facing = 'right';

    this.damage = 10;

    this.jumpDistance = 150;
    this.jumpHeight = 350;
    this.jumpRate = 40;
    this.jumpTimer = 0;
    this.jumpDistanceLength = 10;
    this.jumpDistanceTimer = this.jumpDistanceLength;

    this.frames = {
      idle_left: 0,
      idle_right: 3,
      jump_left: 1,
      jump_right: 4,
      fall_left: 2,
      fall_right: 5,
    };
  }

  jump() {
    this.body.velocity.y = -this.jumpHeight;
    this.jumpDistanceTimer = 0;
  }

  halt() {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.frame = this.frames['idle_' + this.facing];
  }

  air() {
    this.jumpDistanceTimer++;
    if (this.jumpDistanceTimer < this.jumpDistanceLength) {
      if (this.facing == 'right') {
        this.body.velocity.x = this.jumpDistance;
      } else {
        this.body.velocity.x = -this.jumpDistance;
      }
    }
    if (this.body.velocity.y < 0) {
      this.frame = this.frames['jump_' + this.facing];
    } else {
      this.frame = this.frames['fall_' + this.facing];
    }
  }

  action(player) {
    // console.log(this.game.physics.arcade.overlap(player, this));
    this.game.physics.arcade.overlap(player, this, function () {player.damage(this.damage)}, function () {return player.enabled}, this);

    if (this.body.blocked.down) {
      this.halt();
      this.jumpTimer++;
      if (this.jumpTimer > this.jumpRate) {
        this.jumpTimer = 0;
        this.jump();
      }
    } else {
      this.air();
    }

    if (this.x > player.x) {
      this.facing = 'left';
    } else {
      this.facing = 'right';
    }
  }
}

export default Meerkat;
