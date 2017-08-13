
import Simple from '../util/Simple';

const COMMANDS = ['view', 'end', 'label', 'jump', 'menu', 'option', 'show', 'hide'];

export default class Interpreter {

  constructor() {
    this.linedatum = [];
    this.index = -1;
  }

  // returns linedata object {params, text, type}
  static parseLine(line) {
    const linedata = {};
    const colonindex = line.indexOf(':');
    if (colonindex !== -1) {
      linedata.params = line.substring(0, colonindex).split(' ');
      linedata.text = line.substring(colonindex + 1, line.length).trim();
    } else {
      linedata.text = line;
    }

    if (!linedata.params) {
      // this is a continuation of the last line
      // use the same settings
      linedata.type = 'dialog';
    } else {
      // What type of command?
      linedata.type = Simple.firstIntersect(linedata.params, COMMANDS);
      if (linedata.type === -1) {
        linedata.type = 'dialog';
      }
    }

    return linedata;
  }

  nextLine() {
    if (this.index + 1 < this.linedatum.length) {
      this.index += 1;
      return this.currentLine();
    }
    return null;
  }

  previousLine() {
    this.index -= 1;
    return this.currentLine();
  }

  currentLine() {
    return this.linedatum[this.index];
  }

  getIndex() {
    return this.index;
  }

  setIndex(index) {
    this.index = index;
  }

}
