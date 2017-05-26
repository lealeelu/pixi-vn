const PIXI = require( 'pixi.js' );

module.exports = class Character{
  constructor( stage, displayGroup, options ) {
    this.stage = stage;
    this.displayGroup = displayGroup;
    this.fullname = options.fullname;
    this.id = options.id;
    this.imagedir = options.imagedir;
    this.showing = false;
    this.desaturated = false;
    this.images = options.images;

    this._body = new PIXI.Sprite();
    this._body.displayGroup = this.displayGroup;
    //this.setPortrait(this.images[0]);
    //positioning
    let scale = 0.76;
    //this._body.scale.set(scale, scale);
    this._body.anchor.set(0.5, 1);
    this._body.position.set(options.x || 100, options.y || 100);
    this._body.zOrder = 2;

    this.stage.addChild(this._body);
  }

  show() {
    if (!this.showing) {
      this._body.alpha = 1;
    }
    this.showing = true;
  }

  hide() {
    if (this.showing) {
      this._body.alpha = 0;
    }
    this.showing = false;
  }

  activate() {
  //TODO remove desaturation
    this.desaturated = false;
  }

  deactivate() {
  //TODO add desaturation
    this.desaturated = true;
  }

  centerOnLocation(location) {
    this._body.position.set(location.x, location.y);
  }

  isPortrait(portrait_name) {
    return this.images.includes(portrait_name);
  }

  setPortrait(portrait_name) {
    let texture = PIXI.Texture.fromImage(this.imagedir + portrait_name + '.png')
    this._body.texture = texture;
  }
}
