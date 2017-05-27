import Dialog from '../objects/Dialog';

let instance = null;

export default class DialogController {
  constructor(game) {
    if (!instance) {
      this.game = game;
      instance = this;
    }

    return instance;
  }

  updateDialogText(command) {
    if (command) {
      if (command.character) {
        this.dialogBox.updateName(command.character.fullname);
      }
      if (command.text) {
        this.dialogBox.updateText(command.text);
      }
    }
  }

  loadDefaultDialog() {
    this.dialogBox = new Dialog(this.game);
  }
}
