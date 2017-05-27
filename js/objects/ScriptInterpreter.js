/*
When fed scriptdata, this interpreter should direct the flow of the story, handling...
- menu choices
- jumps
- variables

*/

import ScriptData from './ScriptData';
import Simple from '../util/Simple';

const COMMANDS = ['view', 'end', 'label', 'jump', 'menu', 'show', 'hide'];

let instance = null;

export default class ScriptInterpreter {
    // TODO asset loader really shouldn't be referenced here.
  constructor(scripts, startScript, assetloader) {
    if (!instance) {
      this.scripts = new Map();

    for(const script of scripts) {
      this.scripts.set(script.id,
          new ScriptData(assetloader.resources[script.url].data));
    }
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
      command.type = Simple.compareReturn(nextline.params, COMMANDS);
      if (!command.type) {
        command.type = 'dialog';
      }

      switch (command.type) {
        case 'jump':
          this.jumpTo(nextline.text);
          break;
        case 'menu':
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

  jumpTo(labelname) {
    for (let [key, value] of this.scripts) {
      if (value.jumps.has(labelname)) {
        this.currentScript = value;
        value.index = value.jumps.get(labelname);
      }
    }
  }
}
