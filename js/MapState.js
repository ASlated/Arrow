class MapState extends Phaser.State {
  create() {
    this.map = this.game.add.sprite(0, 0, 'world_2');
    this.map.scale.setTo(2, 2);

    this.locations = {
      'Paris': new Phaser.Point(181, 111),
      'Svalbard': new Phaser.Point(196, 30),
      'New York': new Phaser.Point(103, 122),
      // 'London': new Phaser.Point(179, 104),
      // 'Tokyo': new Phaser.Point(321, 127),
      // 'Miami': new Phaser.Point(98, 137),
      // 'San Francisco': new Phaser.Point(57, 125),
      // 'Moscow': new Phaser.Point(218, 98),
      // 'Berlin': new Phaser.Point(193, 105),
      // 'Anchorage': new Phaser.Point(29, 86),
      // 'Beijing': new Phaser.Point(298, 122),
      // 'Hong Kong': new Phaser.Point(294, 143),
      // 'Seoul': new Phaser.Point(308, 125),
      // 'Shanghai': new Phaser.Point(302, 133),
      // 'Mumbai': new Phaser.Point(255, 148),
      // 'Rome': new Phaser.Point(193, 119),
      // 'Athens': new Phaser.Point(204, 123),
      // 'Johannesburg': new Phaser.Point(209, 192),
      // 'Madrid': new Phaser.Point(176, 120),
      // 'Los Angles': new Phaser.Point(60, 129),
      // 'Chicago': new Phaser.Point(91, 120),
    }

    this.names = {};

    let style = {font: "bold 16px Arial", fill: 'black', stroke: 'white', strokeThickness: 3};
    this.textGroup = this.game.add.group(this.game.world, 'names');
    this.locationGroup = this.game.add.group(this.game.world, 'locations');

    Object.keys(this.locations).forEach((k) => {
      let x = this.locations[k].x * 2;
      let y = this.locations[k].y * 2;
      let location = this.locationGroup.add(this.game.add.sprite(x, y, 'location'));
      let name = this.game.add.text(x, y - 20, k, style);
      this.names[k] = this.textGroup.add(name);
      this.names[k].visible = false;
    });

    this.game.world.swap(this.textGroup, this.locationGroup);

  }

  update() {
    this.active = null;
    Object.keys(this.locations).forEach((k) => {
      this.names[k].visible = false;
      let point = {x: this.game.input.activePointer.x / 2, y: this.game.input.activePointer.y / 2}
      let dist = Phaser.Point.distance(this.locations[k], point);
      if (dist < 4) {
        this.active = k;
      }
    });
    if (this.active) {
      this.names[this.active].visible = true;
    }
  }
}

export default MapState;
