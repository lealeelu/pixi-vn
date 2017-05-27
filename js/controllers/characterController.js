import Character from '../objects/Character';

const PIXI = require('pixi.js');

let instance = null;

export default class CharacterController {

  constructor(game) {
    if (!instance) {
      this.game = game;
      this.stage = this.game.app.stage;
      this.displayGroup = new PIXI.DisplayGroup(1, true);
      this.characters = new Map();
      this.currentCharacter = null;

      // load characters based off of config
      for (const character of this.game.config.characters) {
        this.characters.set(
          character.id.toLowerCase(),
          new Character(this.stage, this.displayGroup, character));
      }

      instance = this;
    }

    return instance;
  }

  showCharacter(shortcode) {
    const character = this.getCharacter(shortcode);
    if (character) character.show();
    else console.error(`Can't show ${shortcode}. Does character actually exist?`);
  }

  hideCharacter(shortcode) {
    const character = this.getCharacter(shortcode);
    if (character) character.hide();
    else console.error(`Can't hide ${shortcode}. Does character actually exist?`);
  }

  getCharacter(shortcode) {
    return this.characters.get(shortcode);
  }

  characterExists(shortcode) {
    return this.characters.has(shortcode);
  }

  isCurrentCharacter(shortcode) {
    return this.currentCharacter.shortcode === shortcode;
  }

  setCurrentCharacter(shortcode) {
    this.currentCharacter = this.getCharacter(shortcode);
  }

  get CurrentCharacter() {
    return this.currentCharacter;
  }

  listCharacters() {
    for (const [key, value] of this.characters) {
      console.log(`On stage: ${key} ${value}`);
    }
  }
}
