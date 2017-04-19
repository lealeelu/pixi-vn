const PIXI = require('pixi.js');
const PIXIdisplay = require('pixi-display');

let instance = null;

module.exports = class ViewController {
  constructor(game) {
    if (!instance) {
      this._game = game;
      this._views = new Map();

      //setup view screen and add it to stage
      this.currentview = new PIXI.Sprite();
      // 0 is the zOrder (zindex)
      this.displayGroup = new PIXI.DisplayGroup(0, true);
      this.currentview.displayGroup = this.displayGroup;
      this.currentview.width = this._game.app.view.width;
      this.currentview.height = this._game.app.view.height;

      this._game.app.stage.addChild(this.currentview);

      //cache backgrounds from config
      for (let view of this._game.config.views) {
        this._views.set(view.id, view.url);
      }

      instance = this;
    }

    return instance;
  }

  setBackground(viewid) {
    let viewurl = this._views.get(viewid);
    if (viewurl) {
      let texture = PIXI.Texture.fromImage(viewurl);
      this.currentview.texture = texture;
    }
    else {
      console.error(`View ${viewid} not found`);
    }
  }

  scaleToStage() {
    this.currentview.scale = Math.min(game.renderer.width/this.currentview.texture.width,
      game.renderer.height/this.currentview.texture.height);
  }
}
