import BootState from './BootState.js';
import LoadState from './LoadState.js';
import PlayState from './PlayState.js';
import MapState from './MapState.js';
import StartState from './StartState.js';
import GameOverState from './GameOverState.js';

class Game extends Phaser.Game {
  constructor() {
    let config = {
      width: 768,
      height: 480,
      antialias: false,
      resolution: 2,
      parent: 'game',
      renderer: Phaser.Canvas
    };
    super(config);

    this.state.add('boot', new BootState(this));
    this.state.add('load', new LoadState(this));
    this.state.add('play', new PlayState(this));
    this.state.add('map', new MapState(this));
    this.state.add('start', new StartState(this));
    this.state.add('gameOver', new GameOverState(this));

    this.state.start('boot');
  }
}

export default Game;
