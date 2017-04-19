

let instance = null;

module.exports = class ChoiceMenu() {
  constructor(element){
    if (!instance) {
      this._element = element;
      this._question = '';
      this._answers = [];
      instance = this;
    }

    //TODO handle questions
    
    return instance;
  }
}
