import { Sprite, Texture, DisplayGroup } from 'pixi.js';

let instance = null;

export default class ViewController {
  constructor(game) {
    if (!instance) {
      this.game = game;
      this.views = new Map();

      // setup view screen and add it to stage
      this.currentview = new Sprite();
      // 0 is the zOrder (zindex)
      this.displayGroup = new DisplayGroup(0, true);
      this.currentview.displayGroup = this.displayGroup;
      this.currentview.width = this.game.app.view.width;
      this.currentview.height = this.game.app.view.height;

      this.game.app.stage.addChild(this.currentview);

      // cache backgrounds from config
      for (const view of this.game.config.views) {
        this.views.set(view.id, view.url);
      }

      instance = this;
    }

    return instance;
  }

  setBackground(viewid) {
    const viewurl = this.views.get(viewid);
    if (viewurl) {
      const texture = Texture.fromImage(viewurl);
      this.currentview.texture = texture;
    } else {
      console.error(`View ${viewid} not found`);
    }
  }

  scaleToStage() {
    this.currentview.scale = Math.min(this.game.renderer.width / this.currentview.texture.width,
      this.game.renderer.height / this.currentview.texture.height);
  }
}
