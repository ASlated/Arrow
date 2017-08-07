class LoadState extends Phaser.State {
  preload() {
    this.game.load.spritesheet('player', '/assets/girl.png', 16, 16);
  }

  create() {
    this.game.state.start('play');
  }
}

export default LoadState;
