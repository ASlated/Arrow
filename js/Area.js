const areas = require('../assets/json/areas.json');
const tilesets = require('../assets/json/tilesets.json');

class Area {
  constructor(game, area) {
    this.game = game;
    this.area = areas[area];
    this.tileset = tilesets[this.area.tileset];
    this.game.stage.backgroundColor = '#' + this.tileset.color;
    this.barColor = parseInt(this.invertHex(this.tileset.color), 16);
    let map;
    if (this.area.scenery) {
      map = this.game.add.tilemap(this.area.tilemap + '_main', 16, 16);
    } else {
      map = this.game.add.tilemap(this.area.tilemap, 16, 16);
    }
    map.addTilesetImage(this.area.tileset + '_area');
    map.setCollisionByExclusion(this.tileset.setCollisionByExclusion);
    this.layer = map.createLayer(0);
    this.layer.setScale(2, 2);
    this.layer.resizeWorld();
    this.player = this.area.player;
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
    let sceneryMap = this.game.add.tilemap(this.area.tilemap + '_scenery', 16, 16);
    sceneryMap.addTilesetImage('scenery');
    this.sceneryLayer = sceneryMap.createLayer(0);
    this.sceneryLayer.setScale(2, 2);
  }

}

export default Area;
