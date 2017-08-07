import Player from './Player.js';
import Area from './Area.js';

class PlayState extends Phaser.State {
  create() {
    this.game.stage.backgroundColor = '#94C4FF';
    this.game.physics.arcade.gravity.y = 1000;
    this.keyboard = this.game.input.keyboard;
    this.area = new Area(this.game, 'grass_area', 'area_1');
    this.player = new Player(this.game, 0, 0);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.area.layer);
    if (this.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
      this.player.running = true;
    } else {
      this.player.running = false;
    }
    if (this.keyboard.isDown(Phaser.Keyboard.E)) {
      this.player.walk('right');
    } else if (this.keyboard.isDown(Phaser.Keyboard.A)) {
      this.player.walk('left');
    } else {
      this.player.halt();
    }
    if (this.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.player.jump();
    }
    if (!this.player.body.blocked.down) {
      this.player.air();
    }
    if (this.player.flashing) {
      this.player.flash();
    }
  }

  render() {
    // this.game.debug.geom(this.game.camera.deadzone);
  }

}

export default PlayState;
