/* eslint-env mocha */

import assert from 'assert';
import simple from '../../../js/util/Simple';

describe('Simple', () => {
  describe('#firstIntersect()', () => {
    it('should return the first intersection if it exists', () => {
      assert.equal('view', simple.firstIntersect(['blah', 'blur', 2, 'view'], ['view']));
    });
    it('should return -1 if no intersection', () => {
      assert.equal(-1, simple.firstIntersect(['blah'], ['view']));
    });
    it('should return -1 if both arrays are empty', () => {
      assert.equal(-1, simple.firstIntersect([], []));
    });
  });
});
