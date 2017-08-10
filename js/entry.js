import 'phaser-shim';
import Game from './Game.js';
import Controls from "./Controls.jsx"

const game = new Game();

Controls({
  onChangeKeyboardLayout: (layout) => {
    game.keyboardLayout = layout;
  }
});
