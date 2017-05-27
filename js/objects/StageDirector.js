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

import CharacterController from '../controllers/CharacterController';
import DialogController from '../controllers/DialogController';
import ViewController from '../controllers/ViewController';
import ScriptInterpreter from '../objects/ScriptInterpreter';

let instance = null;

export default class StageDirector {
  constructor(game) {
    if (!instance) {
      this.game = game;
      this.characterController = new CharacterController(this.game);
      this.dialogController = new DialogController(this.game);
      this.viewController = new ViewController(this.game);
      this.scenes = new Map();
      this.positions = new Map();
      const gamewidth = this.game.app.screen.width;
      const gameheight = this.game.app.screen.height;

      this.positions.set('middle', { x: gamewidth / 2, y: gameheight });
      this.positions.set('right', { x: (gamewidth / 4) * 3, y: gameheight });
      this.positions.set('offstage_right', { x: (gamewidth / 4) * 5, y: gameheight });
      this.positions.set('left', { x: gamewidth / 4, y: gameheight });
      this.positions.set('offstage_left', { x: -gamewidth / 4, y: gameheight });

      this.ScriptInterpreter = new ScriptInterpreter(
        this.game.config.scripts, this.game.config.startScript,
        this.game.assetloader);
      instance = this;
    }
    return instance;
  }

  play() {
    this.dialogController.loadDefaultDialog();
    this.advanceStory();
  }

  advanceStory() {
    const command = this.ScriptInterpreter.nextLine();
    if (command) {
      switch (command.type) {
        case 'view':
          this.viewController.setBackground(command.text);
          this.advanceStory();
          break;

        case 'hide':
          this.characterController.hideCharacter(command.text);
          this.advanceStory();
          break;

        case 'show':
          this.characterController.showCharacter(command.text);
          this.advanceStory();
          break;

        case 'jump':
          break;

        case 'label':
          this.advanceStory();
          break;

        case 'dialog':

          if (command.params) {
            // find out what the other parameters mean
            for (const param of command.params) {
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

              if (!command.portrait) {
                command.portrait = command.character.isPortrait(param);
                if (command.portrait) {
                  command.character.setPortrait(param);
                  // if you're setting the character portrait,
                  // I'm assuming you want it to show.
                  command.character.show();
                  continue;
                }
              }
            }
          }
          if (!command.character) {
            command.character = this.characterController.CurrentCharacter;
            if (!command.character) console.error('What character??');
          }
          this.dialogController.updateDialogText(command);
          break;

        default:
          console.error(`Unknown Command\n ${JSON.stringify(command)}`);
      }
        // TODO
        // Are we changing the music?
        // Are we changing any effects?
        // Do I need a different dialog box?
        // wait until everything is finished....
    }

    this.game.renderMe = true;
  }

}
