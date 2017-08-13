/* eslint-env mocha */

import assert from 'assert';
import ScriptInterpreter from '../../../js/objects/ScriptInterpreter';

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

describe('ScriptInterpreter', function () {
  let scriptInterpreter = null;
  describe('#constructor', function () {
    beforeEach(function() {
      scriptInterpreter = new ScriptInterpreter();
    });
    it('should create without error', function () {
      assert.ok(scriptInterpreter);
    });
    it('should load a script', function () {
      scriptInterpreter.parseScript(script);
      assert.equal(12, scriptInterpreter.linedatum.length);
    });
  });

  describe('#parseData', function() {
    beforeEach(function () {
      scriptInterpreter = new ScriptInterpreter();
      scriptInterpreter.parseScript(script);
    });
    it('should have correct number of lines', function() {
      assert.equal(scriptInterpreter.linedatum.length, 12);
    });
    it('should capture a jump label with index', function() {
      scriptInterpreter.jumpTo('restart');
      assert.equal(scriptInterpreter.getIndex(), 0);
    });
    it('should capture menu data', function() {
      scriptInterpreter.jumpToIndex(4)
      const data = scriptInterpreter.getMenuData();
      assert.ok(data);
      assert.equal(data.question, 'Should I stick around?');
      assert.equal(data.options[0].index, 5);
      assert.equal(data.options[0].text, 'Yes');
      assert.equal(data.options[1].index, 8);
      assert.equal(data.options[1].text, 'No');
    });
  });
  describe('#jumpTo', function() {
    it('should jumpTo the correct index', function() {
      scriptInterpreter.jumpTo('restart');
      assert.equal(0, scriptInterpreter.getIndex());
    });
  });
  describe('#nextLine', function() {
    it('should return the next line data', function() {
      scriptInterpreter.setIndex(10);
      const line = scriptInterpreter.nextLine();
      assert(11, scriptInterpreter.getIndex());
      assert({ params: ['jump'], text: 'restart' }, line);
    });
  });
  describe('#previousLine', function() {
    it('should return the previous line data', function() {
      scriptInterpreter.setIndex(10);
      const line = scriptInterpreter.previousLine();
      assert(9, scriptInterpreter.getIndex());
      assert({ params: [], text: "I'm leaving!!" }, line);
    });
  });
  describe('#currentLine', function() {
    it('should return the currentLine', function() {
      scriptInterpreter.setIndex(10);
      const line = scriptInterpreter.currentLine();
      assert(10, scriptInterpreter.getIndex());
      assert({ params: [], text: 'What now though?' }, line);
    });
  });
});
