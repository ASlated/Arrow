class Arrows extends Phaser.Group {
  constructor(game) {
    super(game, game.world, 'arrows', false, true, Phaser.Physics.ARCADE);
    this.game = game;
    this.minRange = 100;
    this.maxRange = 250;
    this.rangeIncrease = 2;
    this.range = this.minRange;

    this.frames = [-0.5, -0.75, -1, 0.75, 0.5, 0.25, 0, -0.25];
    for (let i = 0; i < this.frames.length; i++) { this.frames[i] *= Math.PI; }
  }

  shoot(trajectory) {
    let frame = this.getFrame(trajectory.angle);
    let arrow = this.arrow(trajectory.start.x, trajectory.start.y, frame);
    arrow.internalAngle = trajectory.angle;
    this.add(arrow);
    arrow.body.gravity.y = 20;
    this.game.physics.arcade.velocityFromRotation(arrow.internalAngle, this.range * 3, arrow.body.velocity);
    this.game.time.events.add(3000, this.destroyArrow, this)
    this.range = this.minRange;
  }

  closest(num, arr) {
    let curr = arr[0];
    let diff = Math.abs(num - curr);
    for (let val = 0; val < arr.length; val++) {
      let newdiff = Math.abs(num - arr[val]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = arr[val];
      }
    }
    return arr.indexOf(curr);
  }

  charge() {
    if (this.range < this.maxRange) {
      this.range += this.rangeIncrease;
    }
    this.chargeCapacity = (this.range - this.minRange) / (this.maxRange - this.minRange)
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
    return this.closest(angle, this.frames);
  }
}

export default Arrows;
