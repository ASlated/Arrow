import BootState from './BootState.js';
import LoadState from './LoadState.js';
import PlayState from './PlayState.js';

class Game extends Phaser.Game {
  constructor() {
    let config = {
      width: 768,
      height: 480,
      antialias: false,
      resolution: 2,
      parent: 'game',
    };
    super(config);

    this.state.add('boot', new BootState(this));
    this.state.add('load', new LoadState(this));
    this.state.add('play', new PlayState(this));

    this.state.start('boot');
  }
}

export default Game;
