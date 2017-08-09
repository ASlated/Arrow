class LoadState extends Phaser.State {
  preload() {
    this.game.load.spritesheet('player', '/assets/sprites/player.png', 16, 15);
    this.game.load.spritesheet('meerkat', '/assets/sprites/meerkat.png', 18, 16);
    this.game.load.spritesheet('arrow', '/assets/sprites/arrow.png', 7, 7);
    this.game.load.spritesheet('walkButton', '/assets/sprites/walkButton.png', 64, 64);
    this.game.load.spritesheet('jumpButton', '/assets/sprites/jumpButton.png', 132, 64);
    this.game.load.image('grass_area', '/assets/tilesets/grass.png');
    this.game.load.image('background', '/assets/sprites/background.jpg');
    this.game.load.tilemap('area_1', '/assets/tilemaps/area_1.csv', null, Phaser.Tilemap.CSV);
  }

  create() {
    this.game.state.start('play');
  }
}

export default LoadState;
