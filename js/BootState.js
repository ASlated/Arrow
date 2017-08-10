class BootState extends Phaser.State {
  create() {
    // this.game.renderer.renderSession.roundPixels = true;
    // this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    // this.game.scale.setMinMax(512, 480, 512, 480);
    if (!this.game.device.iOS && !this.game.device.android && !this.game.device.windowsPhone) {
      this.game.keyboardLayout = prompt("Enter your current keyboard layout: ", "qwerty").toLowerCase();
    }
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
