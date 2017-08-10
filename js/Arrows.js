class Arrows extends Phaser.Group {
  constructor(game) {
    super(game, game.world, 'arrows', false, true, Phaser.Physics.ARCADE);
    this.game = game;
    this.minRange = 100;
    this.maxRange = 250;
    this.rangeIncrease = 2;
    this.range = this.minRange;
    this.line = new Phaser.Line();
  }

  shoot(trajectory) {
    let frame = this.getFrame(trajectory.angle);
    let arrow = this.arrow(trajectory.start.x, trajectory.start.y, frame);
    arrow.angle = trajectory.angle + Math.random() * 0.1 - 0.05;
    this.add(arrow);
    arrow.body.gravity.y = 500;
    this.line.fromAngle(arrow.x, arrow.y, arrow.angle, this.range);
    this.game.physics.arcade.velocityFromRotation(arrow.angle, 700, arrow.body.velocity);
    this.game.time.events.add(3000, this.destroyArrow, this)
    this.range = this.minRange;
  }

  charge() {
    if (this.range < this.maxRange) {
      this.range += this.rangeIncrease;
    }
  }

  arrow(x, y, frame) {
    let arrow = new Phaser.Sprite(this.game, x, y, 'arrow', 0);
    arrow.scale.setTo(2, 2);
    return arrow;
  }

  destroyArrow(index = 0) {
    this.removeChildAt(index);
  }

  getFrame(angle) {
    return Math.round((angle + Math.PI) / (Math.PI * 2) * 7);
  }
}

export default Arrows;
