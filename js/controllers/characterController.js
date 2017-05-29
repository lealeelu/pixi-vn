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
      this.game.config.characters.forEach((character) => {
        this.characters.set(
          character.id.toLowerCase(),
          new Character(this.stage, this.displayGroup, character));
      });

      instance = this;
    }

    return instance;
  }

  showCharacter(shortcode) {
    const character = this.getCharacter(shortcode);
    if (character) character.show();
  }

  hideCharacter(shortcode) {
    const character = this.getCharacter(shortcode);
    if (character) character.hide();
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
}
