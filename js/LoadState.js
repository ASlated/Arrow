class LoadState extends Phaser.State {
  preload() {
    this.game.load.spritesheet('player', '/assets/sprites/player.png', 16, 15);
    // this.game.load.spritesheet('meerkat', '/assets/sprites/meerkat.png', 18, 16);
    this.game.load.spritesheet('arrow', '/assets/sprites/arrow.png', 6, 6);
    this.game.load.spritesheet('walkButton', '/assets/sprites/walkButton.png', 66, 48);
    this.game.load.spritesheet('jumpButton', '/assets/sprites/jumpButton.png', 44, 66);
    this.game.load.image('grass_area', '/assets/tilesets/grass.png');
    this.game.load.image('snow_area', '/assets/tilesets/snow.png');
    this.game.load.image('tree', '/assets/scenery/tree.png');
    // this.game.load.image('snow', '/assets/sprites/snow.png');
    // this.game.load.image('background', '/assets/sprites/background.jpg');
    this.game.load.tilemap('area_1', '/assets/tilemaps/area_1.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('area_2', '/assets/tilemaps/area_2.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('area_3', '/assets/tilemaps/area_3.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('area_4', '/assets/tilemaps/area_4.csv', null, Phaser.Tilemap.CSV);
    this.load.atlas('generic', '/virtual_joystick/skins/generic-joystick.png', '/virtual_joystick/skins/generic-joystick.json');
  }

  create() {
    this.game.state.start('play', true, false, {area: 'area_4'});
  }
}

export default LoadState;
