const Character = require('../objects/character');
const PIXI = require('pixi.js');
const PIXIdisplay = require('pixi-display');
const Simple = require ('../util/Simple');


let instance = null;

module.exports = class CharacterController {

  constructor( game ) {
    if(!instance) {
      this.game = game;
      this.stage = this.game.app.stage;
      this.displayGroup = new PIXI.DisplayGroup(1, true);
      this._characters = new Map();
      this._currentCharacter = null;

      //load characters based off of config
      for (let character of this.game.config.characters) {
        this._characters.set(
          character.id.toLowerCase(),
          new Character(this.stage, this.displayGroup, character));
      }

      instance = this;
    }

    return instance;
  }

  showCharacter(shortcode) {
      let character = this.getCharacter(shortcode);
      if (character) character.show();
      else console.error("Can't show " + shortcode + ". Does character actually exist?");
  }

  hideCharacter(shortcode) {
    let character = this.getCharacter(shortcode);
    if (character) character.hide();
    else console.error("Can't hide " + shortcode + ". Does character actually exist?");
  }

  getCharacter(shortcode) {
    return this._characters.get(shortcode);
  }

  characterExists(shortcode) {
      return this._characters.has(shortcode);
  }

  isCurrentCharacter(shortcode) {
      return this._currentCharacter.shortcode = shortcode;
  }

  setCurrentCharacter(shortcode) {
      this._currentCharacter = this.getCharacter(shortcode);
  }

  get CurrentCharacter() {
    return this._currentCharacter;
  }

  listCharacters() {
    for (var [key, value] of this._characters) {
      console.log("On stage: " + key + " " + value);
    }
  }

}
