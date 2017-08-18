class BootState extends Phaser.State {
  create() {
    this.game.levels = ['area_4', 'area_5'];
    this.game.level = 0;
    this.game.renderer.renderSession.roundPixels = true;
    this.game.keyboardLayout = 'dvorak';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    const SAFARI_SCALE = 0.571428571428571;
    if (this.game.device.safari) {
      this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
      this.game.scale.setUserScale(SAFARI_SCALE, SAFARI_SCALE);
    }
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.goFull = this.goFull.bind(this);
    document.getElementById('button').onclick = this.goFull;
    this.game.state.start('load');
  }

  goFull() {
    if (this.game.device.iOS || this.game.device.safari) {
      alert('Unfortunately, your browser is not currently functioning with fullscreen mode correctly.');
    } else {
      if (this.game.scale.isFullScreen) {
        this.game.scale.stopFullScreen();
      } else {
        this.game.scale.startFullScreen(false);
      }
    }
  }

}

export default BootState;
