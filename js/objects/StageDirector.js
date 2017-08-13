/*

This uses the mediator design pattern.
It is the only class that has knowledge of the various
director it needs to control
-characters
-background
-dialog
-sound
-effects
-menus
It directs by following the ScriptInterpreter's output.

*/

import CharacterController from '../controllers/CharacterController';
import DialogController from '../controllers/DialogController';
import ViewController from '../controllers/ViewController';
import ScriptInterpreter from './ScriptInterpreter';
import MenuController from '../controllers/MenuController';

let instance = null;
const STATE = {
  stop: 'stop',
  play: 'play',
  pause: 'pause',
  menu: 'menu',
};

export default class StageDirector {
  constructor(game) {
    if (!instance) {
      this.game = game;
      this.state = STATE.stop;
      this.characterController = new CharacterController(this.game);
      this.dialogController = new DialogController(this.game);
      this.viewController = new ViewController(this.game);
      this.menuController = new MenuController(this.game);
      this.scenes = new Map();
      this.positions = new Map();
      const gamewidth = this.game.app.screen.width;
      const gameheight = this.game.app.screen.height;

      this.positions.set('middle', { x: gamewidth / 2, y: gameheight });
      this.positions.set('right', { x: (gamewidth / 4) * 3, y: gameheight });
      this.positions.set('offstage_right', { x: (gamewidth / 4) * 5, y: gameheight });
      this.positions.set('left', { x: gamewidth / 4, y: gameheight });
      this.positions.set('offstage_left', { x: -gamewidth / 4, y: gameheight });


      this.interpreter = new ScriptInterpreter();
      let scriptpack = '';
      this.game.config.scripts.forEach((script) => {
        scriptpack = scriptpack + this.game.assetloader.resources[script].data;
      });
      this.interpreter.parseScript(scriptpack);


      this.onMouseDownEvent = this.onMouseDown.bind(this);
      instance = this;
    }
    return instance;
  }

  setup() {
    this.dialogController.loadDefaultDialog();
  }

  play() {
    this.changeState(STATE.play);
    this.clicksOn();
    this.advanceStory();
  }

  advanceStory() {
    const command = this.interpreter.nextLine();
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
          this.advanceStory();
          break;

        case 'label':
          this.advanceStory();
          break;

        case 'menu':
          this.runMenu();
          break;

        case 'option':
          this.advanceStory();
          break;

        case 'dialog':
          this.runDialog(command);
          break;

        default:
          break;
      }
        // TODO
        // Are we changing the music?
        // Are we changing any effects?
        // Do I need a different dialog box?
        // wait until everything is finished....
    }

    this.game.renderMe = true;
  }

  runMenu() {

    const menuData = this.interpreter.getMenuData();
    this.changeState(STATE.menu);
    this.menuController.execute(menuData);
  }

  runMenuOption(optionIndex) {
    this.changeState(STATE.play);
    this.interpreter.jumpToIndex(optionIndex);
  }

  runDialog(command) {
    const dialogCommand = command;
    if (dialogCommand.params) {
      // find out what the other parameters mean
      dialogCommand.params.forEach((param) => {
        if (!dialogCommand.character) {
          dialogCommand.character = this.characterController.getCharacter(param);
        }

        if (!dialogCommand.location) {
          dialogCommand.location = this.positions.get(param);
        }

        if (!dialogCommand.portrait
          && dialogCommand.character
          && dialogCommand.character.isPortrait(param)) {
          dialogCommand.portrait = param;
        }
      });

      if (dialogCommand.character) {
        this.characterController.setCurrentCharacter(dialogCommand.character.shortcode);
      } else {
        dialogCommand.character = this.characterController.CurrentCharacter;
      }
      if (dialogCommand.location) {
        dialogCommand.character.centerOnLocation(dialogCommand.location);
      }
      if (dialogCommand.portrait) {
        dialogCommand.character.setPortrait(dialogCommand.portrait);
        // if you're setting the character portrait,
        // I'm assuming you want it to show.
        dialogCommand.character.show();
      }
    }
    if (dialogCommand.text) {
      this.dialogController.updateDialogText(dialogCommand);
    } else {
      // no text, probably just setting the portrait up
      this.advanceStory();
    }
  }

  changeState(state) {
    switch (state) {
      case STATE.play:
        this.clicksOn();
        break;
      case STATE.stop:
        this.clicksOff();
        break;
      case STATE.menu:
        this.clicksOff();
        break;
      case STATE.pause:
        this.clicksOff();
        break;
      default:
    }
    this.state = state;
  }

  clicksOn() {
    this.game.element.addEventListener('click', this.onMouseDownEvent);
  }

  clicksOff() {
    this.game.element.removeEventListener('click', this.onMouseDownEvent, false);
  }

  onMouseDown() {
    this.advanceStory();
  }
}
