import Player from './player.js';

class PlayState extends Phaser.State {
  create() {
    this.game.stage.backgroundColor = '#94C4FF';
    // this.game.physics.arcade.gravity.y = 500;
    this.keyboard = this.game.input.keyboard;
    this.player = new Player(this.game, 0, 0);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, 1024, 240);
    this.game.camera.follow(this.player);
  }

  update() {
    if (this.keyboard.isDown(Phaser.Keyboard.E)) {
      this.player.walk('right');
    } else if (this.keyboard.isDown(Phaser.Keyboard.A)) {
      this.player.walk('left');
    } else {
      this.player.halt();
    }
  }

}

export default PlayState;
