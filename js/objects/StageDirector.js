/*

This uses the mediator design pattern.
It is the only class that has knowledge of the various
director it needs to control
-characters
-background
-dialog
-sound
-effects

It directs by following the ScriptInterpreter's output.

*/

const CharacterController = require( '../controllers/CharacterController');
const DialogController = require('../controllers/DialogController');
const ViewController = require('../controllers/ViewController');
const ScriptInterpreter = require('../objects/ScriptInterpreter');

let instance = null;

module.exports = class StageDirector{
    constructor(game) {
      if (!instance) {
        this.game = game;

        this.characterController = new CharacterController(this.game);
        this.dialogController = new DialogController(this.game);
        this.viewController = new ViewController(this.game);

        this._scenes = new Map();

        this.positions = new Map();
        let gamewidth = this.game.app.screen.width;
        let gameheight = this.game.app.screen.height;

        let midheight = (gameheight/2) + 50;
        this.positions.set('middle', {x: gamewidth/2, y: gameheight});
        this.positions.set('right', {x: gamewidth/4*3, y: gameheight});
        this.positions.set('offstage_right', {x: gamewidth/4*5, y: gameheight});
        this.positions.set('left', {x: gamewidth/4, y: gameheight});
        this.positions.set('offstage_left', {x: -gamewidth/4, y: gameheight});

        this.ScriptInterpreter = new ScriptInterpreter(
          this.game.config.scripts, this.game.config.startScript,
          this.game.assetloader);
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

      this.advanceStory();

    }

    advanceStory() {
      let command = this.ScriptInterpreter.nextLine();
      if (command) {
        switch (command.type) {

          case "view":
            this.viewController.setBackground(command.text);
            this.advanceStory();
            break;

          case "show":
            break;

          case "dialog":

            if (command.params) {
              //find out what the other parameters mean
              for (let param of command.params) {

                if (!command.character) {
                  if (this.characterController.characterExists(param)) {
                      command.character = this.characterController.getCharacter(param);
                      this.characterController.setCurrentCharacter(param);
                      continue;
                  }
                }

                if (!command.location) {
                  command.location = this.positions.get(param);
                  if (command.location) {
                    command.character.centerOnLocation(command.location);
                    continue;
                  }
                }

                if(!command.portrait) {
                  command.portrait = command.character.isPortrait(param);
                  if (command.portrait) {
                    command.character.setPortrait(param);
                    continue;
                  }
                }
              }
            }
            if (!command.character) {
              command.character = this.characterController.CurrentCharacter;
              if (!command.character) console.error("What character??");
            }
            this.dialogController.updateDialogText(command);
            break;

          default:
            console.error('Unknown Command\n' + JSON.stringify(command));
        }
      }

      this.game.renderMe = true;
    }

}
