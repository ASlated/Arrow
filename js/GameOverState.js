class GameOverState {
  create() {
    this.game.stage.backgroundColor = '#000000';
    let style = {fill: '#FFFFFF'};
    this.game.physics.arcade.gravity.y = 1000;
    this.title = this.game.add.text(this.game.width / 2, -100, 'Game Over', style);
    this.platform = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'game_over_platform');
    this.game.physics.arcade.enable([this.platform, this.title]);
    this.title.anchor.setTo(0.5, 0.5);
    this.title.body.bounce.y = 0.7;
    this.platform.anchor.setTo(0.5, 0);
    this.platform.body.allowGravity = false;
    this.platform.body.immovable = true;
  }

  update() {
    this.game.physics.arcade.collide(this.title, this.platform);
  }
}

export default GameOverState;
