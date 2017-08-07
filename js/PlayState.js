import PIXI from 'pixi';

class PlayState extends Phaser.State {
  create() {
    this.game.stage.backgroundColor = '#94C4FF';
    // this.game.physics.arcade.gravity.y = 500;
    this.player = this.game.add.sprite(0, 0, 'player');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.velocity.x = 50;
    this.player.scale = new PIXI.Point(2, 2);
    this.game.world.setBounds(0, 0, 1024, 240);
    this.game.camera.follow(this.player);
  }

  update() {
  }
}

export default PlayState;
