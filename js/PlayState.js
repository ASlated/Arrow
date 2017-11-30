import Player from './Player.js';
import Area from './Area.js';
import Meerkat from './Meerkat.js';
import Arrows from './Arrows.js';
import VirtualJoystick from './phaser-virtual-joystick.exec.js';

class PlayState extends Phaser.State {
  init(options) {
    this.options = options;
  }

  create() {
    this.game.time.advancedTiming = true;
    if (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone) {
      this.controller = this.game.plugins.add(Phaser.VirtualJoystick);
      this.stick = this.controller.addStick(96, this.game.height - 96, 96, 'generic');
      this.stick.scale = 0.7;
    } else {
      this.stick = {isDown: false};
    }
    this.game.physics.arcade.gravity.y = 1000;
    this.area = new Area(this.game, this.options.area);
    this.enemies = this.game.add.group(this.game.world);
    this.meerkats = this.game.add.group(this.enemies);
    this.area.area.entities.forEach(function(e){this.meerkats.add(new Meerkat(this, e.x * 32, e.y * 32))}, this);

    this.arrows = new Arrows(this.game);

    if (this.options.location == 'start') {
      this.player = new Player(this.game, this.area.start.x, this.area.start.y, this.options.playerHealth);
      this.player.facing = 'right';
    } else if (this.options.location == 'end') {
      this.player = new Player(this.game, this.area.end.x, this.area.end.y, this.options.playerHealth);
      this.player.facing = 'left';
    }
    this.healthText = this.add.text(10, this.game.height - 30, this.player.healthString(), {font: '20px Arial', fill: '#FFFFFF'});
    this.healthText.fixedToCamera = true;

    this.area.drawScenery();
    this.trajectory = new Phaser.Line(this.player.x, this.player.y, this.input.x + this.camera.x, this.input.y + this.camera.y);
    // this.game.input.onUp.add(function () {this.game.paused = false}, this);
    // this.game.input.onDown.add(function () {this.game.paused = true}, this);
    this.game.input.onUp.add(this.shoot, this);
    this.game.input.onDown.add(function(){console.log((this.game.input.x + this.game.camera.x) + ', ' + (this.game.input.y + this.game.camera.y))}, this);
    // this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    this.game.camera.follow(this.player);
    this.chargeBar = this.game.add.graphics(0, 0);
    this.chargeBar.fixedToCamera = true;
    this.chargeBarBackground = this.game.add.graphics(0, 0);
    this.chargeBarBackground.fixedToCamera = true;
    this.chargeBarBackground.beginFill(this.area.barColor, 0.3);
    this.chargeBarBackground.drawRoundedRect(5, 5, this.game.width - 10, 10, 2);
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.area.layer);
    this.game.physics.arcade.collide(this.arrows, this.area.layer);
    this.game.physics.arcade.collide(this.meerkats, this.area.layer);
    this.game.physics.arcade.overlap(this.meerkats, this.arrows, this.arrowCollideEnemy, null, this);
    this.trajectory = new Phaser.Line(this.player.x, this.player.y, this.input.x + this.camera.x, this.input.y + this.camera.y);
    this.chargeBar.clear();
    this.player.charging = false;
    this.player.walkingLeft = false;
    this.player.walkingRight = false;
    this.player.jumping = false;
    this.healthText.text = this.player.healthString();
    if (this.stick.isDown) {
      if (this.stick.force < 0.5) {
        if (Math.abs(this.stick.rotation) > Math.PI / 2) {
          this.player.walkingLeft = true;
        } else {
          this.player.walkingRight = true;
        }
      } else {
        if (Math.abs(this.stick.rotation) > 7 / 8 * Math.PI || this.stick.rotation > Math.PI / 2) {
          this.player.walkingLeft = true;
        } else if (this.stick.rotation > 7 / 8 * -Math.PI && this.stick.rotation < 5 / 8 * -Math.PI) {
          this.player.walkingLeft = true;
          this.player.jumping = true;
        } else if (this.stick.rotation > 5 / 8 * -Math.PI && this.stick.rotation < 3 / 8 * -Math.PI) {
          this.player.jumping = true;
        } else if (this.stick.rotation > 3 / 8 * -Math.PI && this.stick.rotation < 1 / 8 * -Math.PI) {
          this.player.walkingRight = true;
          this.player.jumping = true;
        } else if (this.stick.rotation > 1 / 8 * -Math.PI && this.stick.rotation < Math.PI / 2) {
          this.player.walkingRight = true;
        }
      }
    } else if (this.game.input.activePointer.isDown && this.player.body.blocked.down && this.player.body.velocity.isZero()) {
      this.player.charge(this.trajectory);
      this.arrows.charge()

      this.chargeBar.beginFill(this.area.barColor, 0.5);
      this.chargeBar.drawRoundedRect(5, 5, this.arrows.chargeCapacity * (this.game.width - 10), 10, 2);
    }

    this.enemies.forEach(function(g){g.forEach(function(e){
      if (e.enabled) {
        e.action(this.player);
        if (e.health <= 0) {
          e.die(g);
        }
      }
    }, this)}, this);

    this.arrows.children.forEach(function (arrow) {
      if (arrow.body.blocked.down) {
        arrow.body.velocity.setTo(0, 0);
      } else {
        let frame = this.arrows.getFrame(Math.atan2(arrow.body.velocity.x, arrow.body.velocity.y));
        arrow.frame = frame;
      }
    }.bind(this));

    if (this.player.x > this.game.world.width) {
      if (this.controller) { this.controller.destroy(); }
      this.game.level++;
      this.game.state.start('play', true, false, {area: this.game.levels[this.game.level], location: 'start', playerHealth: this.player.health});
    } else if (this.player.x < 0) {
      if (this.controller) { this.controller.destroy(); }
      this.game.level--;
      this.game.state.start('play', true, false, {area: this.game.levels[this.game.level], location: 'end', playerHealth: this.player.health});
    }
  }

  render() {
    this.game.debug.text(this.game.time.fps, 10, 50, "#00ff00");
    // this.game.debug.body(this.player);
  }

  shoot() {
    if (!this.UIOver && this.player.charging && this.player.body.velocity.isZero()) {
      this.arrows.shoot(this.trajectory);
    }
  }

  arrowCollideEnemy(meerkat, arrow) {
    if (!meerkat.invincible && !arrow.body.blocked.down) {
      arrow.destroy();
      this.world.bringToTop(meerkat);
      meerkat.damage(10);
      // meerkat.invincible = true;
      // meerkat.tint = 0x999999;
      // this.game.time.events.add(1000, meerkat.vulnerable, meerkat);
    }
  }
}

export default PlayState;
