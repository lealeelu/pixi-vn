/*
This director needs to control
-characters
-background
-dialog
-sound
-effects

by referencing the ScriptInterpreter's output

so it must be tied to all of the controllers
*/

const CharacterController = require( '../controllers/CharacterController');
const DialogController = require('../controllers/DialogController');
const ViewController = require('../controllers/ViewController');
const ScriptData = require('../objects/ScriptData');

let instance = null;

module.exports = class StageDirector{
    constructor(game) {
      if (!instance) {
        this.game = game;

        this.characterController = new CharacterController(this.game);
        this.dialogController = new DialogController(this.game);
        this.viewController = new ViewController(this.game);

        this._scripts = new Map();
        for (let script of this.game.config.scripts) {
          this._scripts.set(script.id,
            new ScriptData(this.game.assetloader.resources[script.url].data));
        }
        this.currentScript = this._scripts.get(this.game.config.startScript);
        this.currentScript.index = -1;

        this._scenes = new Map();

        this.positions = new Map();
        let gamewidth = this.game.app.screen.width;
        let gameheight = this.game.app.screen.height;

        let midheight = (gameheight/2) + 50;
        this.positions.set('middle', {x: gamewidth/2, y: midheight});
        this.positions.set('right', {x: gamewidth/4*3, y: midheight});
        this.positions.set('offstage_right', {x: gamewidth/4*5, y: midheight});
        this.positions.set('left', {x: gamewidth/4, y: gameheight});
        this.positions.set('offstage_left', {x: -gamewidth/4, y: midheight});

        instance = this;
      }
      return instance;
    }

    play() {
      // TODO dynamicly...
      //hey script interpreter, what's my line
      //Are we changing the background?
      //Are we changing the music?
      //Are we changing any effects?
      //how do I display the characters?
      //Do I need a different dialog box?
      //who is talking and what do they say?
      //wait until everything is finished....
      //repeat

      this.dialogController.loadDefaultDialog();
      this.characterController.getCharacter("v")
        .centerOnLocation(this.positions.get("left"));

      this.advanceStory();

    }

    advanceStory() {
      let linedata = this.currentScript.nextLine();
      if (linedata) {
        if (linedata.parameters.type == "view") {
          this.viewController.setBackground(linedata.text);
          this.advanceStory();
        } else if (linedata.parameters.type == "show") {

        }
        else {
          let character = this.characterController
            .getCharacter(linedata.parameters.character.toLowerCase());
          if (character) {
            if (character.fullname) {
              linedata.parameters.character = character.fullname;
            }
            //handle character changes
            character.activate();
          } else {
            console.error(`Character ${linedata.parameters.character} not found`);
          }
          this.dialogController.updateDialogText(linedata);

        }
      }

      this.game.renderMe = true;
    }

}
