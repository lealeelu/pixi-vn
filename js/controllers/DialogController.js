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

  updateDialogText(command) {
      if (command) {
        if (command.character) {
            this._dialogBox.updateName(command.character.fullname);
        }
        if (command.text) {
          this._dialogBox.updateText(command.text);
        }
      }
  }

  loadDefaultDialog() {
    this._dialogBox = new Dialog(this._game);
  }

}
