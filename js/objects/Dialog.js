const PIXI = require('pixi.js');
const WIDTH = 700;
const HEIGHT = 200;
const GSAP = require("gsap");

module.exports = class Dialog {
  constructor (game) {
    this._game = game;

    this.dialogbox = game.overlay.getElementsByClassName('dialogbox')[0];
    this.nametext = game.overlay.getElementsByClassName('nametext')[0];
    this.dialogtext = game.overlay.getElementsByClassName('dialogtext')[0];
  }

  updateName(name) {
    this.nametext.innerHTML = name;
  }

  updateText(text) {
      TweenLite.from(this.dialogbox, 0.15, {y: '+=50', autoAlpha: 0, ease: Power4.easeOut});
      this.dialogtext.innerHTML = text;
  }

  centerOnLocation (x, y) {
    this._container.position.set(x - WIDTH/2, y - HEIGHT/2);
  }
}
