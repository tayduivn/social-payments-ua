import { FilterUtils } from './filter-utils';

describe('Utils', () => {
  describe('#equals', () => {
    it('should compare object primitive fields', () => {
      expect(FilterUtils.equals({a: '1'}, {a: '1'})).toBe(true);
      expect(FilterUtils.equals({a: '1'}, {a: '2'})).toBe(false);
    });

    it('should work with nested objects', () => {
      let prev: any;
      let curr: any;

      prev = {
        a: '2',
        b: {
          a: '1'
        }
      };
      curr = {
        a: '2',
        b: {
          a: '2'
        }
      };
      expect(FilterUtils.equals(prev, curr)).toBe(false);

      prev = {
        a: '2',
        b: {
          a: '1'
        }
      };
      curr = {
        a: '2',
        b: {
          a: '1'
        }
      };
      expect(FilterUtils.equals(prev, curr)).toBe(true);
    });
  });

  describe('#isEmpty', () => {
    it('should check object primitive fields', () => {
      expect(FilterUtils.isEmpty({a: ''})).toBe(true);
      expect(FilterUtils.isEmpty({a: '2'})).toBe(false);
    });

    it('should check all fields', () => {
      expect(FilterUtils.isEmpty({a: '', b: '1'})).toBe(false);
    });

    it('should work with nested objects', () => {
      expect(FilterUtils.isEmpty({
        a: '2',
        b: {
          a: '1'
        }
      })).toBe(false);

      expect(FilterUtils.isEmpty({
        a: '',
        b: {
          a: ''
        }
      })).toBe(true);
    });
  });

  describe('#includes', () => {
    let source: any;
    let filter: any;

    it('should check object primitive fields', () => {
      source = {
        a: '1'
      };
      filter = {
        a: '2'
      };
      expect(FilterUtils.includes(source, filter)).toBe(false);

      source = {
        a: '12'
      };
      filter = {
        a: '2'
      };
      expect(FilterUtils.includes(source, filter)).toBe(true);
    });

    it('should check multiple object primitive fields', () => {
      source = {
        a: '1',
        b: '2'
      };
      filter = {
        a: '2',
        b: '3'
      };
      expect(FilterUtils.includes(source, filter)).toBe(false);

      source = {
        a: '12',
        b: '34'
      };
      filter = {
        a: '2',
        b: '4'
      };
      expect(FilterUtils.includes(source, filter)).toBe(true);
    });

    it('should include source with missed filter props', () => {
      source = {
        a: '12'
      };
      filter = {
        a: '2',
        b: 'a'
      };
      expect(FilterUtils.includes(source, filter)).toBe(true);

      source = {
        a: '12'
      };
      filter = {
        b: 'a'
      };
      expect(FilterUtils.includes(source, filter)).toBe(true);

      source = {
        a: '12',
        c: '34555'
      };
      filter = {
        a: '2',
        b: 23
      };
      expect(FilterUtils.includes(source, filter)).toBe(true);
    });

    it('should check match for filter fields only', () => {
      source = {
        a: '12',
        c: '34555'
      };
      filter = {
        a: '2'
      };
      expect(FilterUtils.includes(source, filter)).toBe(true);
    });

    it('should work with nested objects', () => {
      source = {
        a: {
          b: '1'
        }
      };
      filter = {
        a: {
          b: '2'
        }
      };
      expect(FilterUtils.includes(source, filter)).toBe(false);

      source = {
        a: {
          b: '12'
        }
      };
      filter = {
        a: {
          b: '2'
        }
      };
      expect(FilterUtils.includes(source, filter)).toBe(true);
    });

    it('should work with nested objects and primitive fields', () => {
      source = {
        t: '1',
        a: {
          b: '1'
        }
      };
      filter = {
        t: '1',
        a: {
          b: '2'
        }
      };
      expect(FilterUtils.includes(source, filter)).toBe(false);

      source = {
        t: '2',
        a: {
          b: '2'
        }
      };
      filter = {
        t: '1',
        a: {
          b: '2'
        }
      };
      expect(FilterUtils.includes(source, filter)).toBe(false);

      source = {
        t: '1',
        a: {
          b: '12'
        }
      };
      filter = {
        t: '1',
        a: {
          b: '2'
        }
      };
      expect(FilterUtils.includes(source, filter)).toBe(true);
    });
  });
});
