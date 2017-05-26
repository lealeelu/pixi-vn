const PIXI = require( 'pixi.js');
const StageDirector = require('./StageDirector');

module.exports = class ScriptData {

  constructor (script) {
    this.lines = [];
    this._data = script;
    this._index = 0;
    this._jumps = new Map();
    this._parseData();
    console.log("script " + script.url + "loaded w/ " + this._scriptlines.length);
  }

  _parseData() {
    this._scriptlines = this._data.split('\n');
    //easy way to remove blank and commented out lines.
    this._scriptlines = this._scriptlines.filter(function ( line ) {
      return line && !line.startsWith('--');
    });

    for (let i = 0; i < this._scriptlines.length; i++) {
      let line = this._scriptlines[i];
      let linedata = {};
      let colonindex = line.indexOf(':');
      if (colonindex != -1) {
        linedata.params = line.substring(0, colonindex).split(' ');
        linedata.text = line.substring(colonindex+1, line.length).trim();
        if (linedata.params.includes("label")) {
          //store labelname and script line index
          this._jumps.set(linedata.text, i);
        }
      }
      else {
        linedata.text = line;
      }
      this.lines.push(linedata);
    }
  }

  get jumps() {
    return this._jumps;
  }

  get index() {
    return this._index;
  }

  set index(index) {
    this._index = index;
  }

  nextLine() {
    this._index++;
    return this.currentLine();
  }

  previousLine() {
    this._index--;
    return this.currentLine();
  }

  currentLine() {
    return this.lines[this._index];
  }

}
