class Arrows extends Phaser.Group {
  constructor(game) {
    super(game, game.world, 'arrows', false, true, Phaser.Physics.ARCADE);
    this.game = game;
    this.minRange = 100;
    this.maxRange = 250;
    this.rangeIncrease = 2;
    this.range = this.minRange;
  }

  shoot(trajectory) {
    let frame = Math.round((trajectory.angle + Math.PI) / (Math.PI * 2) * 7);
    let arrow = this.arrow(trajectory.start.x, trajectory.start.y, frame);
    if (trajectory.length > this.range) {
      let newTrajectory = new Phaser.Line(0, 0, 0, 0);
      newTrajectory.fromAngle(trajectory.start.x, trajectory.start.y, trajectory.angle, this.range);
      // let move = this.game.add.tween(arrow).to({x: newTrajectory.end.x, y: newTrajectory.end.y}, newTrajectory.length * 2, 'Linear', true);
    } else {
      // let move = this.game.add.tween(arrow).to({x: trajectory.end.x, y: trajectory.end.y}, trajectory.length, 'Linear', true);
    }
    this.add(arrow);
    this.range = this.minRange;
  }

  charge() {
    if (this.range < this.maxRange) {
      this.range += this.rangeIncrease;
    }
  }

  arrow(x, y, frame) {
    let arrow = new Phaser.Sprite(this.game, x, y, 'arrow', frame);
    arrow.scale.setTo(2, 2);
    return arrow;
  }
}

export default Arrows;
