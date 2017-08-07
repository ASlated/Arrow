import Player from './player.js';

class PlayState extends Phaser.State {
  create() {
    this.game.stage.backgroundColor = '#94C4FF';
    this.game.physics.arcade.gravity.y = 1000;
    this.keyboard = this.game.input.keyboard;
    this.map = this.game.add.tilemap('map', 16, 16);
    this.map.addTilesetImage('tiles');
    this.map.setCollisionByExclusion([-1]);
    this.layer = this.map.createLayer(0);
    this.layer.setScale(2, 2);
    this.layer.resizeWorld();
    this.player = new Player(this.game, 0, 0);
    this.game.world.setBounds(0, 0, 1024, 240);
    this.game.camera.follow(this.player);
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.layer);
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
  }

}

export default PlayState;
