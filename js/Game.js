import BootState from './BootState.js';
import LoadState from './LoadState.js';
import PlayState from './PlayState.js';

class Game extends Phaser.Game {
  constructor() {
    // config = {
    //   width: 256,
    //   height: 240,
    //   antialias: false,
    //   resolution: 3
    // }
    super({width: 512, height: 480, antialias: false, resolution: 2});

    this.state.add('boot', new BootState(this));
    this.state.add('load', new LoadState(this));
    this.state.add('play', new PlayState(this));

    this.state.start('boot');
  }
}

export default Game;
