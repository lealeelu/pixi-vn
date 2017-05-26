/*
When fed scriptdata, this interpreter should direct the flow of the story, handling...
- menu choices
- jumps
- variables

*/

const ScriptData = require ('./ScriptData');
const Simple = require ('../util/Simple');

const COMMANDS = ["view", "end", "label", "jump", "menu", "show", "hide"];

let instance = null;

module.exports = class ScriptInterpreter{
  //TODO asset loader really shouldn't be referenced here.
    constructor(scripts, startScript, assetloader) {
      if (!instance) {
        this._scripts = new Map();

        for (let script of scripts) {
          this._scripts.set(script.id,
            new ScriptData(assetloader.resources[script.url].data));
        }
        this.currentScript = this._scripts.get(startScript);
        this.currentScript.index = -1;

        instance = this;
      }

      return instance;
    }

    addScript(filename) {
    }

    //returns linedata object
    nextLine() {
      let command = {};
      let nextline = this.currentScript.nextLine();
      if (!nextline.params) {
        //this is a continuation of the last line
        //use the same settings
        command.type = "dialog"
      } else {
        command.params = nextline.params;
        // What type of command?
        command.type = Simple.compare_return(nextline.params, COMMANDS);
        if (!command.type) {
          command.type = "dialog"
        }

        switch (command.type) {
          case "jump":
            this.jumpTo(nextline.text);
            break;
          case "menu":
            break;
        }
      }
      command.text = nextline.text;

      return command;
    }

    //returns linedata object
    currentLine() {
      return this.currentScript.currentLine();
    }

    jumpTo(labelname) {
      for (let [key,value] of this._scripts) {
        if (value.jumps.has(labelname)) {
            this.currentScript = value;
            value.index = value.jumps.get(labelname);
        }
      }
    }
}
