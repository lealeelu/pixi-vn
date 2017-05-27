
export default class ScriptData {

  constructor(script) {
    this.lines = [];
    this.data = script;
    this.index = 0;
    this.jumps = new Map();
    this.parseData();
    console.log(`script ${script.url} loaded w/ ${this.scriptlines.length}`);
  }

  parseData() {
    this.scriptlines = this.data.split('\n');
    // easy way to remove blank and commented out lines.
    this.scriptlines = this.scriptlines.filter(function (line) {
      return line && !line.startsWith('--');
    });

    for (let i = 0; i < this.scriptlines.length; i += 1) {
      const line = this.scriptlines[i];
      const linedata = {};
      const colonindex = line.indexOf(':');
      if (colonindex !== -1) {
        linedata.params = line.substring(0, colonindex).split(' ');
        linedata.text = line.substring(colonindex + 1, line.length).trim();
        if (linedata.params.includes('label')) {
          // store labelname and script line index
          this.jumps.set(linedata.text, i);
        }
      } else {
        linedata.text = line;
      }
      this.lines.push(linedata);
    }
  }

  getJumps() {
    return this.jumps;
  }

  getIndex() {
    return this.index;
  }

  setIndex(index) {
    this.index = index;
  }

  nextLine() {
    this.index += 1;
    return this.currentLine();
  }

  previousLine() {
    this.index -= 1;
    return this.currentLine();
  }

  currentLine() {
    return this.lines[this.index];
  }

}
