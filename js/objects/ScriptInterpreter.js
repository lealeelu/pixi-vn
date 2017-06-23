/*
When fed scriptdata, this interpreter should direct the flow of the story, handling...
- menu choices
- jumps
- variables

*/

import Simple from '../util/Simple';
import ScriptData from './ScriptData';

const COMMANDS = ['view', 'end', 'label', 'jump', 'menu', 'option', 'show', 'hide'];

let instance = null;

export default class ScriptInterpreter {
    // TODO asset loader really shouldn't be referenced here.
  constructor(scripts, startScript, assetloader) {
    if (!instance) {
      this.scripts = new Map();

      scripts.forEach((script) => {
        this.scripts.set(script.id,
        new ScriptData(assetloader.resources[script.url].data));
      });
      this.currentScript = this.scripts.get(startScript);
      this.currentScript.index = -1;

      instance = this;
    }

    return instance;
  }

  // returns linedata object
  nextLine() {
    const command = {};
    const nextline = this.currentScript.nextLine();
    if (!nextline.params) {
      // this is a continuation of the last line
      // use the same settings
      command.type = 'dialog';
    } else {
      command.params = nextline.params;
      // What type of command?
      command.type = Simple.firstIntersect(nextline.params, COMMANDS);
      if (command.type === -1) {
        command.type = 'dialog';
      }

      switch (command.type) {
        case 'jump':
          this.jumpTo(nextline.text);
          break;
        default:
          break;
      }
    }
    command.text = nextline.text;

    return command;
  }

  currentLine() {
    return this.currentScript.currentLine();
  }

  getMenuData() {
    return this.currentScript.getMenuData();
  }

  jumpTo(labelname) {
    this.scripts.forEach((script) => {
      if (script.jumps.has(labelname)) {
        this.currentScript = script;
        script.jumpTo(labelname);
      }
    });
  }

  jumpToIndex(index) {
    this.currentScript.setIndex(index);
  }
}
