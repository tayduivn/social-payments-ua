import * as _ from 'lodash';

export class FilterUtils {
  public static equals(prev: Object, curr: Object): boolean {
    return _.isEqual(prev, curr);
  }

  public static isEmpty(obj: Object): boolean {
    return Object.values(obj).every(val => {
      if (_.isObject(val)) {
        return FilterUtils.isEmpty(val);
      } else {
        return !val;
      }
    });
  }

  public static includes(source: Object, filter: Object): boolean {
    return Object.keys(filter).every((key) => {
      if (!source[key] || !filter[key]) { return true; }

      if (_.isObject(source[key]) && _.isObject(filter[key])) {
        return FilterUtils.includes(source[key], filter[key]);
      } else {
        return source[key].toString().toLowerCase().includes(filter[key].toString().toLowerCase());
      }
    });
  }
}
