class MapState extends Phaser.State {
  create() {
    this.map = this.game.add.sprite(0, 0, 'world_2');
    // this.map.scale.setTo(2, 2);
    this.game.stage.backgroundColor = '#9999ff';

    // this.sites = {
    //   'Paris': new Phaser.Point(181, 111),
    //   'Svalbard': new Phaser.Point(196, 30),
    //   'New York': new Phaser.Point(103, 122),
    //   'London': new Phaser.Point(179, 104),
    //   'Tokyo': new Phaser.Point(321, 127),
    //   'Miami': new Phaser.Point(98, 137),
    //   'San Francisco': new Phaser.Point(57, 125),
    //   'Moscow': new Phaser.Point(218, 98),
    //   'Berlin': new Phaser.Point(193, 105),
    //   'Anchorage': new Phaser.Point(29, 86),
    //   'Beijing': new Phaser.Point(298, 122),
    //   'Hong Kong': new Phaser.Point(294, 143),
    //   'Seoul': new Phaser.Point(308, 125),
    //   'Shanghai': new Phaser.Point(302, 133),
    //   'Mumbai': new Phaser.Point(255, 148),
    //   'Rome': new Phaser.Point(193, 119),
    //   'Athens': new Phaser.Point(204, 123),
    //   'Johannesburg': new Phaser.Point(209, 192),
    //   'Madrid': new Phaser.Point(176, 120),
    //   'Los Angles': new Phaser.Point(60, 129),
    //   'Chicago': new Phaser.Point(91, 120),
    // }

    this.regions = {
      'Sovio': new Phaser.Point(154, 107),
    }

    this.seas = {
      'Thespian': new Phaser.Point(269, 217),
    }

    this.sites = {
      'Tora': new Phaser.Point(343, 229),
    }

    this.names = {};

    let siteStyle = {font: "bold 12px Verdana", fill: 'black', stroke: 'white', strokeThickness: 3};
    let regionStyle = {font: "bold 18px Verdana", fill: 'black', stroke: 'white', strokeThickness: 3};
    let seaStyle = {font: "normal 14px Verdana", fill: '#444477', align: 'center'};
    this.textGroup = this.game.add.group(this.game.world, 'names');
    this.circles = this.game.add.graphics(0, 0);

    Object.keys(this.sites).forEach((k) => {
      let x = this.sites[k].x;
      let y = this.sites[k].y;
      this.circles.lineStyle(1, 0x000000);
      this.circles.beginFill(0xFFFFFF);
      this.circles.drawCircle(x, y, 8);
      let name = this.game.add.text(x, y - 20, k, siteStyle);
      this.names[k] = this.textGroup.add(name);
      this.names[k].visible = false;
    });

    Object.keys(this.regions).forEach((k) => {
      let x = this.regions[k].x;
      let y = this.regions[k].y;
      let name = this.game.add.text(x, y, k.toUpperCase(), regionStyle);
      name.anchor.setTo(0.5, 0.5);
    });

    Object.keys(this.seas).forEach((k) => {
      let x = this.seas[k].x;
      let y = this.seas[k].y;
      let name = this.game.add.text(x, y, k + "\nSea", seaStyle);
      name.anchor.setTo(0.5, 0.5);
    });

    this.game.world.swap(this.textGroup, this.circles);

    this.carbon = this.game.add.tileSprite(this.map.width, 0, this.game.width - this.map.width, this.game.height, 'carbon');

  }

  update() {
    this.carbon.tilePosition.y += 0.5;
    this.active = null;
    Object.keys(this.sites).forEach((k) => {
      this.names[k].visible = false;
      let point = {x: this.game.input.activePointer.x, y: this.game.input.activePointer.y}
      let dist = Phaser.Point.distance(this.sites[k], point);
      if (dist < 5) {
        this.active = k;
      }
    });
    if (this.active) {
      this.names[this.active].visible = true;
    }
  }
}

export default MapState;
