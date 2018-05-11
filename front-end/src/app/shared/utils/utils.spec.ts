import { Utils } from './utils';

describe('Utils', () => {
  describe('#isObject', () => {
    it('should return true for object', () => {
      expect(Utils.isObject({})).toBe(true);
    });

    it('should return false for null', () => {
      expect(Utils.isObject(null)).toBe(false);
    });
  });
});
