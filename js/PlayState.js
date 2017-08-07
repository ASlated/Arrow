class PlayState extends Phaser.State {
  create() {
    this.game.stage.backgroundColor = '#94C4FF';
    this.game.physics.arcade.gravity.y = 500;
    this.player = this.game.add.sprite(0, 0, 'player');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
  }
}

export default PlayState;
