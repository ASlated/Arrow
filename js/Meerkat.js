class Meerkat extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'meerkat');
    this.game = game;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.setSize(6, 16, 0);
    this.facing = 'right';
    this.scale.setTo(2, 2);
    this.anchor.setTo(0.5, 0.5);
    this.body.collideWorldBounds = true;

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

    this.game.add.existing(this);
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
}

export default Meerkat;
