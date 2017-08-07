class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'player', 0);
    this.speed = 100;
    this.scale = new PIXI.Point(2, 2);
    this.facing = 'right';
    game.add.existing(this);
    // debugger;
    this.frames = {
      idle_right: 0,
      idle_left: 3,
    }
    this.animations.add('walk-right', [2, 0, 1, 0], 5);
    this.animations.add('walk-left', [5, 3, 4, 3], 5);
    this.walk = this.walk.bind(this);
    this.halt = this.halt.bind(this);
  }

  walk(facing) {
    this.facing = facing;
    this.animations.play('walk-' + this.facing);
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
}

export default Player;
