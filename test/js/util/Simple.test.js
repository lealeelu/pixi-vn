/* eslint-env mocha */

import assert from 'assert';
import simple from '../../../js/util/Simple';

describe('Simple', function () {
  describe('#firstIntersect()', function () {
    it('should return the first intersection if it exists', function () {
      assert.equal('view', simple.firstIntersect(['blah', 'blur', 2, 'view'], ['view']));
    });
    it('should return -1 if no intersection', function () {
      assert.equal(-1, simple.firstIntersect(['blah'], ['view']));
    });
    it('should return -1 if both arrays are empty', function () {
      assert.equal(-1, simple.firstIntersect([], []));
    });
  });
});
