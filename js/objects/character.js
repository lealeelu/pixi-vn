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

    this.setPortrait(this.images[0]);
    //positioning
    let scale = 0.76;
    //this._body.scale.set(scale, scale);
    this._body.anchor.set(0.5, 1);
    this._body.position.set(options.x || 100, options.y || 100);
    this._body.zOrder = 2;

    this.stage.addChild(this._body);
  }

  show() {
    this.showing = true;
  }

  hide() {
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
    this._body = PIXI.Sprite.fromImage( this.imagedir + portrait_name + '.png' );
    this._body.displayGroup = this.displayGroup;
  }
}
