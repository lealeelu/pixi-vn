const PIXI = require( 'pixi.js');

module.exports = class ScriptData {

  constructor (script) {
    this.lines = [];
    this._data = script;
    this._parseData();
    this._index = 0;
    console.log("script " + script.url + "loaded w/ " + this._scriptlines.length);
  }

  _parseData() {
    this._scriptlines = this._data.split('\n');
    //easy way to remove blank and commented out lines.
    this._scriptlines = this._scriptlines.filter(function ( line ) {
      return line && !line.startsWith('--');
    });

    for (let line of this._scriptlines) {
      let linedata = {};
      let colonindex = line.indexOf(':');
      if (colonindex != -1) {
        linedata.parameters = this._parseParameters(line.substring(0, colonindex));
        linedata.text = line.substring(colonindex+1, line.length).trim();
      }
      else {
        linedata.text = line;
      }

      this.lines.push(linedata);
    }
  }

  _parseParameters (paramstring) {
    let params = {};
    let paramchunks = paramstring.split(' ');

    //TODO if it's a label statement, cache the possible jump destination

    for (let param of paramchunks) {
      param = param.toLowerCase();
      if (param == "view"
            || param == "end"
            || param == "label"
            || param == "jump"
            || param == "menu") {
        params.type = param;
      }
    }

    if (!params.type) {
      params.type = "dialog";
      params.character = paramchunks[0];
    }

    return params;
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
