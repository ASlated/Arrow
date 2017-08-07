class BootState extends Phaser.State {
  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.state.start('load');
  }
}

export default BootState;
