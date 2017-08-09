class BootState extends Phaser.State {
  create() {
    // this.game.renderer.renderSession.roundPixels = true;
    // this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    // this.game.scale.setMinMax(512, 480, 512, 480);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.goFull = this.goFull.bind(this);
    document.getElementById('button').onclick = this.goFull;
    this.game.state.start('load');

  }

  goFull() {
    if (this.game.scale.isFullScreen) {
        this.game.scale.stopFullScreen();
    } else {
        this.game.scale.startFullScreen(false);
    }
  }

}

export default BootState;
