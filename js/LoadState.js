class LoadState extends Phaser.State {
  preload() {
    this.game.load.spritesheet('player', '/assets/sprites/player.png', 16, 15);
    this.game.load.spritesheet('meerkat', '/assets/sprites/meerkat.png', 18, 16);
    this.game.load.spritesheet('arrow', '/assets/sprites/arrow.png', 6, 6);
    this.game.load.spritesheet('walkButton', '/assets/sprites/walkButton.png', 66, 48);
    this.game.load.spritesheet('jumpButton', '/assets/sprites/jumpButton.png', 44, 66);
    this.game.load.image('grass_area', '/assets/tilesets/grass.png');
    this.game.load.image('snow_area', '/assets/tilesets/snow.png');
    this.game.load.image('tree', '/assets/scenery/tree.png');
    this.game.load.image('world', '/assets/sprites/world.png');
    this.game.load.image('world_2', '/assets/sprites/world_2.png');
    this.game.load.image('location', '/assets/sprites/location.png');
    this.game.load.image('title', '/assets/sprites/title.png');
    // this.game.load.image('snow', '/assets/sprites/snow.png');
    // this.game.load.image('background', '/assets/sprites/background.jpg');
    this.game.load.tilemap('area_1', '/assets/tilemaps/area_1.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('area_2', '/assets/tilemaps/area_2.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('area_3', '/assets/tilemaps/area_3.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('area_4', '/assets/tilemaps/area_4.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('area_5', '/assets/tilemaps/area_5.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('area_6', '/assets/tilemaps/area_6.csv', null, Phaser.Tilemap.CSV);
    this.game.load.audio('shoot', '/assets/sounds/shoot.wav');
    this.game.load.audio('jump', '/assets/sounds/jump.wav');
    this.game.load.audio('start', '/assets/sounds/start.wav');
    this.game.load.audio('enemy_die', '/assets/sounds/enemy_die.wav');
    this.game.load.audio('holusi1', '/assets/music/Holusi1.mp3');
    this.game.load.audio('holusi2', '/assets/music/Holusi2.mp3');
    this.game.load.audio('holusi3', '/assets/music/Holusi3.mp3');
    this.game.load.audio('holusi4', '/assets/music/Holusi4.mp3');
    this.game.load.audio('holusi5', '/assets/music/Holusi5.mp3');
    this.load.atlas('generic', '/virtual_joystick/skins/generic-joystick.png', '/virtual_joystick/skins/generic-joystick.json');
  }

  create() {
    // this.game.state.start('play', true, false, {area: 'area_4', location: 'start'});
    // this.game.state.start('map');
    this.game.state.start('start');
  }
}

export default LoadState;
