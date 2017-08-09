import Player from './Player.js';
import Area from './Area.js';
import Meerkat from './Meerkat.js';
import Arrows from './Arrows.js';

class PlayState extends Phaser.State {
  create() {
    this.game.stage.backgroundColor = '#000000';
    this.game.physics.arcade.gravity.y = 1000;
    this.keyboard = this.game.input.keyboard;
    this.background = this.game.add.graphics(0, 0);
    this.background.fixedToCamera = true;
    this.background.beginFill(0x94C4FF, 1);
    this.background.drawRect(0, 0, this.game.width, this.game.height);
    this.area = new Area(this.game, 'grass_area', 'area_1');
    // this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
    // this.game.world.swap(this.area.layer, this.background);
    this.reach = this.game.add.graphics(0, 0);
    this.aim = this.game.add.graphics(0, 0);
    this.meerkat = new Meerkat(this.game, 320, 300);
    this.arrows = new Arrows(this.game);
    this.player = new Player(this.game, 192, 382);
    this.trajectory = new Phaser.Line(this.player.x, this.player.y, this.input.x + this.camera.x, this.input.y + this.camera.y);
    this.game.input.onUp.add(this.shoot, this);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    if (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone) {
      this.leftButton = this.game.add.button(8, this.game.height - 72, 'walkButton', null, this, 0, 0, 1);
      this.leftButton.onInputDown.add(this.walkLeft, this);
      this.leftButton.onInputUp.add(this.stopWalkLeft, this);
      this.leftButton.fixedToCamera = true;
      this.rightButton = this.game.add.button(76, this.game.height - 72, 'walkButton', null, this, 0, 0, 1);
      this.rightButton.onInputDown.add(this.walkRight, this);
      this.rightButton.onInputUp.add(this.stopWalkRight, this);
      this.rightButton.fixedToCamera = true;
      this.jumpButton = this.game.add.button(8, this.game.height - 208, 'jumpButton', null, this, 0, 0, 1);
      this.jumpButton.onInputDown.add(this.jump, this);
      this.jumpButton.onInputUp.add(this.stopJump, this);
      this.jumpButton.fixedToCamera = true;
      this.jumpLeftButton = this.game.add.button(8, this.game.height - 140, 'walkButton', null, this, 0, 0, 1);
      this.jumpLeftButton.onInputDown.add(this.jumpLeft, this);
      this.jumpLeftButton.onInputUp.add(this.stopJumpLeft, this);
      this.jumpLeftButton.fixedToCamera = true;
      this.jumpRightButton = this.game.add.button(76, this.game.height - 140, 'walkButton', null, this, 0, 0, 1);
      this.jumpRightButton.onInputDown.add(this.jumpRight, this);
      this.jumpRightButton.onInputUp.add(this.stopJumpRight, this);
      this.jumpRightButton.fixedToCamera = true;
    }
  }

  update() {
    // this.background.x = this.camera.x * 0.6;
    this.trajectory = new Phaser.Line(this.player.x, this.player.y, this.input.x + this.camera.x, this.input.y + this.camera.y);
    this.reach.clear();
    this.aim.clear();
    if (this.player.walkingLeft || this.player.walkingRight || this.player.jumping) {
      this.UIOver = true;
    } else {
      this.UIOver = false;
    }
    if (this.game.input.activePointer.isDown && !this.UIOver) {
      this.arrows.charge();
      this.player.charging = true;

      // let alpha = (this.arrows.range - this.arrows.minRange) / (this.arrows.maxRange - this.arrows.minRange)
      let alpha = 1
      this.reach.beginFill(0x000000, alpha * 0.1)
      this.reach.lineStyle(1, 0x000000, alpha);
      // this.reach.arc(this.player.x, this.player.y, this.arrows.range, this.trajectory.angle + 0.2, this.trajectory.angle - 0.2, true, 15);

      this.rangedTrajectory = new Phaser.Line;
      this.rangedTrajectory.fromAngle(this.player.x, this.player.y, this.trajectory.angle, this.arrows.range);
      this.aim.lineStyle(1, 0xFFFFFF);
      if (this.trajectory.length > this.arrows.range) {

      }
      let middlePointX = (this.player.x + this.trajectory.end.x) / 2;
      let middlePointY = (this.player.y + this.trajectory.end.y) / 2 - 100;
      console.log('----------')
      console.log('Player: ' + Math.round(this.player.x) + ', ' + Math.round(this.player.y));
      console.log('Control: ' + Math.round(middlePointX) + ', ' + Math.round(middlePointY));
      console.log('Mouse: ' + (this.input.x + this.camera.x) + ', ' + (this.input.y + this.camera.y));
      this.aim.moveTo(this.player.x, this.player.y);
      if (this.trajectory.length > this.arrows.range) {
        middlePointX = (this.player.x + this.rangedTrajectory.end.x) / 2;
        middlePointY = (this.player.y + this.rangedTrajectory.end.y) / 2 - 100;
        this.aim.quadraticCurveTo(middlePointX, middlePointY, this.rangedTrajectory.end.x, this.rangedTrajectory.end.y);
      } else {
        this.aim.quadraticCurveTo(middlePointX, middlePointY, this.input.x + this.camera.x, this.input.y + this.camera.y);
      }
    }
    this.game.physics.arcade.collide(this.player, this.area.layer);
    this.game.physics.arcade.collide(this.meerkat, this.area.layer);
    this.game.physics.arcade.collide(this.arrows, this.area.layer);
    if (this.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
      this.player.running = true;
    } else {
      this.player.running = false;
    }
    if (this.keyboard.isDown(Phaser.Keyboard.E) || this.player.walkingRight) {
      this.player.walk('right');
    } else if (this.keyboard.isDown(Phaser.Keyboard.A) || this.player.walkingLeft) {
      this.player.walk('left');
    } else {
      this.player.halt();
    }
    if (this.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.player.jumping) {
      this.player.jump();
    }
    if (!this.player.body.blocked.down) {
      this.player.air();
    }
    if (this.player.flashing) {
      this.player.flash();
    }

    if (this.meerkat.body.blocked.down) {
      this.meerkat.halt();
      this.meerkat.jumpTimer++;
      if (this.meerkat.jumpTimer > this.meerkat.jumpRate) {
        this.meerkat.jumpTimer = 0;
        this.meerkat.jump();
      }
    } else {
      this.meerkat.air();
    }

    if (this.meerkat.x > this.player.x) {
      this.meerkat.facing = 'left';
    } else {
      this.meerkat.facing = 'right';
    }
  }

  render() {
    // this.game.debug.geom(this.trajectory);
  }

  shoot() {
    if (!this.UIOver) {
      this.arrows.shoot(this.trajectory);
      this.player.charging = false
    }
  }

  walkLeft() { this.player.walkingLeft = true; }
  stopWalkLeft() { this.player.walkingLeft = false; }
  walkRight() { this.player.walkingRight = true; }
  stopWalkRight() { this.player.walkingRight = false; }
  jump() { this.player.jumping = true; }
  stopJump() { this.player.jumping = false; }
  jumpLeft() { this.player.jumping = true; this.player.walkingLeft = true; }
  stopJumpLeft() { this.player.jumping = false; this.player.walkingLeft = false; }
  jumpRight() { this.player.jumping = true; this.player.walkingRight = true; }
  stopJumpRight() { this.player.jumping = false; this.player.walkingRight = false; }

}

export default PlayState;
