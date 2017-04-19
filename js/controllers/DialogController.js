const PIXI = require('pixi.js');
const Dialog = require('../objects/dialog');

let instance = null;

module.exports = class DialogController {
  constructor(game) {
    if (!instance) {
      this._game = game;
      instance = this;
    }

    return instance;
  }

  updateDialogText(linedata) {
      if (linedata) {
        if (linedata.parameters && linedata.parameters.character) {
            this._dialogBox.updateName(linedata.parameters.character);
        }
        if (linedata.text) {
          this._dialogBox.updateText(linedata.text);
        }
      }
  }

  loadDefaultDialog() {
    this._dialogBox = new Dialog(this._game);
  }

}
