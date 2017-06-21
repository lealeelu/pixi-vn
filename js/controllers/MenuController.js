

let instance = null;

export default class MenuController {
  constructor(game) {
    if (!instance) {
      this.menuElement = game.element.getElementsByClassName('menu');
      this.questionElement = game.element.getElementsByClassName('menu-question');
      this.menuOptionElement = game.element.getElementsByClassName('menu-option');
      instance = this;
    }

    return instance;
  }

  execute(menuData) {
    this.questionElement.text = menuData.question;
  }
}
