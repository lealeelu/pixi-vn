import { Texture, Sprite } from 'pixi.js';
import { TweenLite, Power2 } from 'gsap';

export default class Character {
  constructor(stage, displayGroup, options) {
    this.stage = stage;
    this.displayGroup = displayGroup;
    this.fullname = options.fullname;
    this.id = options.id;
    this.imagedir = options.imagedir;
    this.showing = false;
    this.desaturated = false;
    this.images = options.images;

    this.body = new Sprite();
    this.body.displayGroup = this.displayGroup;
    // positioning
    this.body.anchor.set(0.5, 1);
    this.body.position.set(options.x || 100, options.y || 100);
    this.body.zOrder = 2;

    this.stage.addChild(this.body);
  }

  show() {
    if (!this.showing) {
      this.body.alpha = 1;
    }
    this.showing = true;
  }

  hide() {
    if (this.showing) {
      this.body.alpha = 0;
    }
    this.showing = false;
  }

  activate() {
  // TODO remove desaturation
    this.desaturated = false;
  }

  deactivate() {
  // TODO add desaturation
    this.desaturated = true;
  }

  centerOnLocation(location) {
    TweenLite.to(this.body, 0.3, { y: location.y, x: location.x });
    // this.body.position.set(location.x, location.y);
  }

  isPortrait(portraitName) {
    return this.images.includes(portraitName);
  }

  setPortrait(portraitName) {
    const texture = Texture.fromImage(`${this.imagedir}${portraitName}.png`);
    this.body.texture = texture;
  }
}
