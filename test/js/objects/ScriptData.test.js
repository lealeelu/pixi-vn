/* eslint-env mocha */

import assert from 'assert';
import ScriptData from '../../../js/objects/ScriptData';

const script = `label: restart
view: arch
v offstage_left unsure:
v left: Where was I supposed to go again?

menu: Should I stick around?
option: Yes
I guess I'll stay.
jump: restart

option: No
I'm leaving!!
What now though?

jump: restart`;

describe('ScriptData', () => {
  describe('#constructor', () => {
    it('should create without error', () => {
      const scriptData = new ScriptData('');
      assert.ok(scriptData);
    });
    it('should load a script', () => {
      const scriptData = new ScriptData(script);
      assert.ok(scriptData);
    });
  });
  let scriptData = null;
  beforeEach(() => {
    scriptData = new ScriptData(script);
  });
  describe('#parseData', () => {
    it('should have correct number of lines', () => {
      assert.equal(12, scriptData.lines.length);
    });
    it('should capture a jump label with index', () => {
      assert.equal(0, scriptData.getJumps().get('restart'));
    });
    it('should capture menu data', () => {
      assert.deepEqual({ question: 'Should I stick around?',
        options: [{ index: 5, text: 'Yes' }, { index: 8, text: 'No' }] }, scriptData.menus.get(4));
    });
  });
  describe('#jumpTo', () => {
    it('should jumpTo the correct index', () => {
      scriptData.jumpTo('restart');
      assert.equal(0, scriptData.getIndex());
    });
  });
  describe('#nextLine', () => {
    it('should return the next line data', () => {
      scriptData.setIndex(10);
      const line = scriptData.nextLine();
      assert(11, scriptData.getIndex());
      assert({ params: ['jump'], text: 'restart' }, line);
    });
  });
  describe('#previousLine', () => {
    it('should return the previous line data', () => {
      scriptData.setIndex(10);
      const line = scriptData.previousLine();
      assert(9, scriptData.getIndex());
      assert({ params: [], text: "I'm leaving!!" }, line);
    });
  });
  describe('#currentLine', () => {
    it('should return the currentLine', () => {
      scriptData.setIndex(10);
      const line = scriptData.currentLine();
      assert(10, scriptData.getIndex());
      assert({ params: [], text: 'What now though?' }, line);
    });
  });
});
