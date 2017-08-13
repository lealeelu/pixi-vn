
import Interpreter from './Interpreter';

export default class ScriptInterpreter extends Interpreter {
  constructor() {
    super();
    this.jumps = new Map();
    this.menus = new Map();
  }

  parseScript(script) {
    let scriptlines = script.split('\n');
    // easy way to remove blank and commented out lines.
    scriptlines = scriptlines.filter(line => line && !line.startsWith('--'));
    let menuIndex = -1;
    let menuData = null;

    for (let i = 0; i < scriptlines.length; i += 1) {
      const line = scriptlines[i];
      const linedata = Interpreter.parseLine(line);
      if (linedata.params) {
        if (linedata.params.includes('label')) {
          // store labelname and script line index
          this.jumps.set(linedata.text, i);
        } else if (linedata.params.includes('menu')) {
          // if this isn't the first menu item of the script...
          if (menuIndex !== -1) {
            this.menus.set(menuIndex, menuData); // base case
          }
          // reset or create for the first time
          menuIndex = i;
          menuData = { options: [] };
          menuData.question = linedata.text;
        } else if (linedata.params.includes('option')) {
          menuData.options.push({ index: i, text: linedata.text });
        }
      }
      if (menuData && !this.menus.has(menuIndex)) {
        this.menus.set(menuIndex, menuData);
      }
      this.linedatum.push(linedata);
    }
  }

  // returns linedata object
  nextLine() {
    this.index += 1;
    const linedata = this.currentLine();

    switch (linedata.type) {
      case 'jump':
        this.jumpTo(linedata.text);
        break;
      default:
        break;
    }

    return linedata;
  }

  jumpToIndex(index) {
    this.setIndex(index);
  }

  getMenuData() {
    return this.menus.get(this.index);
  }

  jumpTo(labelname) {
    this.index = this.jumps.get(labelname);
  }

}
