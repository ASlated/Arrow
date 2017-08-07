class LoadState extends Phaser.State {
  preload() {
    this.game.load.spritesheet('player', '/assets/sprites/player.png', 16, 15);
    this.game.load.image('grass_area', '/assets/tilesets/grass.png');
    this.game.load.tilemap('area_1', '/assets/tilemaps/area_1.csv', null, Phaser.Tilemap.CSV);
  }

  create() {
    this.game.state.start('play');
  }
}

export default LoadState;
