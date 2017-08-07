class LoadState extends Phaser.State {
  preload() {
    this.game.load.spritesheet('player', '/assets/player.png', 16, 15);
  }

  create() {
    this.game.state.start('play');
  }
}

export default LoadState;
