const areas = require('../assets/json/areas.json');
const tilesets = require('../assets/json/tilesets.json');

class Area {
  constructor(game, area) {
    this.game = game;
    this.area = areas[area];
    this.tileset = tilesets[this.area.tileset];
    this.game.stage.backgroundColor = '#' + this.tileset.color;
    this.barColor = parseInt(this.invertHex(this.tileset.color), 16);
    let map = this.game.add.tilemap(this.area.tilemap, 16, 16);
    map.addTilesetImage(this.area.tileset + '_area');
    map.setCollisionByExclusion(this.tileset.setCollisionByExclusion);
    this.layer = map.createLayer(0);
    this.layer.renderSettings.enableScrollDelta = false;
    this.layer.setScale(2, 2);
    this.layer.resizeWorld();
    this.start = this.area.start;
    this.end = this.area.end;
  }

  preload() {
    this.game.load.tilemap(this.area.tilemap, '/assets/tilemaps/' + this.area.tilemap + '.csv');
  }

  invertHex(hexnum){
    if (hexnum.length != 6) {
      alert("Hex color must be six hex numbers in length.");
      return false;
    }

    hexnum = hexnum.toUpperCase();
    let splitnum = hexnum.split("");
    let resultnum = "";
    let simplenum = "FEDCBA9876".split("");
    let complexnum = new Array();
    complexnum.A = "5";
    complexnum.B = "4";
    complexnum.C = "3";
    complexnum.D = "2";
    complexnum.E = "1";
    complexnum.F = "0";

    for(let i = 0; i < 6; i++){
      if (!isNaN(splitnum[i])) {
        resultnum += simplenum[splitnum[i]];
      } else if (complexnum[splitnum[i]]){
        resultnum += complexnum[splitnum[i]];
      } else {
        alert("Hex colors must only include hex numbers 0-9, and A-F");
        return false;
      }
    }

    return resultnum;
  }

  drawScenery() {
    if (this.area.scenery) {
      this.area.scenery.forEach(function(element) {
        this.game.add.sprite(element.x * 32, element.y * 32, element.key).scale.setTo(2, 2);
      }.bind(this));
    }
  }
}

export default Area;
