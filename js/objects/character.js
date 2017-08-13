import { Texture, Sprite } from 'pixi.js';
import { TweenLite, Power1 } from 'gsap';

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
      TweenLite.to(this.body, 0.2, { alpha: 1 });
    }
    this.showing = true;
  }

  hide() {
    if (this.showing) {
      TweenLite.to(this.body, 0.2, { alpha: 0 });
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
    if (this.showing) {
      TweenLite.to(this.body, 0.3, { y: location.y, x: location.x, ease: Power1.easeOut });
    } else {
      this.body.position.set(location.x, location.y);
    }
  }

  isPortrait(portraitName) {
    return this.images.includes(portraitName);
  }

  setPortrait(portraitName) {
    const texture = Texture.fromImage(`${this.imagedir}${portraitName}.png`);
    this.body.texture = texture;
  }
}
