class StartState extends Phaser.State {
  create() {
    this.title = this.game.add.sprite(this.game.width / 2, 128, 'title');
    this.title.anchor.setTo(0.5, 0.5);
    this.title.scale.setTo(2, 2);
    let style = {fill: '#FFFFFF', fontSize: 15, align: 'center'};
    this.subtitle = this.game.add.text(this.game.width / 2, this.game.height - 64, "Click to start!\n© 2017 Aidan Slate", style);
    this.subtitle.anchor.setTo(0.5, 0.5);
    this.song = this.game.add.audio('holusi3');
    this.song.addMarker('music', 0, 57.05);
    if (this.game.device.iOS) {
      this.game.time.events.add(1000, function () {this.song.play('music', 50, 0.4, true)}, this);
    } else {
      this.song.play('music', 50, 0.5, true);
    }

    this.game.input.onDown.add(function () {
      let sound = this.game.add.audio('start');
      sound.play();
      this.song.stop();
      // this.song = this.game.add.audio('holusi1');
      this.song = this.game.add.audio('holusi1');
      // this.song.addMarker('music', 1.8, 14.8);
      this.song.addMarker('music', 0, 57.05);
      this.song.play('music', 50, 0.4, true);
      this.game.state.start('play', true, false, {area: 'area_4', location: 'start'});
      // this.game.state.start('map');
    }, this);
  }
}

export default StartState;
