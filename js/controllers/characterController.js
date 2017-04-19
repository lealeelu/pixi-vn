const Character = require('../objects/character');
const PIXI = require('pixi.js');
const PIXIdisplay = require('pixi-display');

let instance = null;

module.exports = class CharacterController {

  constructor( game ) {
    if(!instance) {
      this.game = game;
      this.stage = this.game.app.stage;
      this.displayGroup = new PIXI.DisplayGroup(1, true);
      this._characters = new Map();

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

  getCharacter(shortcode) {
    return this._characters.get(shortcode);
  }

  listCharacters() {
    for (var [key, value] of this._characters) {
      console.log("On stage: " + key + " " + value);
    }
  }

}
