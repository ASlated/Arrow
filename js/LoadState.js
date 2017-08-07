class LoadState extends Phaser.State {
  preload() {
    this.game.load.spritesheet('player', '/assets/player.png', 16, 15);
    this.game.load.image('tiles', '/assets/tileset.png');
    this.game.load.tilemap('map', '/assets/tilemap.csv', null, Phaser.Tilemap.CSV);
  }

  create() {
    this.game.state.start('play');
  }
}

export default LoadState;
