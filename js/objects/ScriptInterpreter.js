/*
When fed scriptdata, this interpreter should direct the flow of the story, handling...
- menu choices
- jumps
- variables

*/

const ScriptData = require ('./ScriptData');

let instance = null;

module.exports = class ScriptInterpreter{
    constructor() {
      if (!instance) {
        this._scripts = new Map();
        //TODO load scripts in script directory
        let filename = 'data/00_Intro_devvi.txt';
        this.currentScript = new ScriptData(filename);
        this._scripts.set(filename, this.currentScript);

        instance = this;
      }

      return instance;
    }

    addScript(filename) {
    }

    //returns linedata object
    nextLine() {
      let nextline = this.currentScript.nextLine();
      //debugger;
      //TODO remove all this and put it into stagedirector. Kind of useless.
      //TODO what kind of command type?
        //branching choice
        //jump statement
        //label statement - ignore, already cached in ScriptData.
        //character statement
        //view statement
        //character movement
        //effect statement'
        //extended line

      return nextline;
    }

    //returns linedata object
    currentLine() {
      return this.currentScript.currentLine();
    }

}
