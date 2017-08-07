class BootState extends Phaser.State {
  create() {
    // this.game.renderer.renderSession.roundPixels = true;
    // this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    // this.game.scale.setMinMax(512, 480, 512, 480);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.state.start('load');
  }
}

export default BootState;
