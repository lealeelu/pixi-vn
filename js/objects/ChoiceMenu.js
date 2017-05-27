

let instance = null;

export default class ChoiceMenu {
  constructor(element) {
    if (!instance) {
      this.element = element;
      this.question = '';
      this.answers = [];
      instance = this;
    }

    // TODO handle questions

    return instance;
  }
}
