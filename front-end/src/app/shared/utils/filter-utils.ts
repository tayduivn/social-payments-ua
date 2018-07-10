import { Utils } from './utils';

export class FilterUtils {
  public static equals(prev: Object, curr: Object): boolean {
    return Object.keys(prev).every(key => {
      if (Utils.isObject(prev[key]) && Utils.isObject(curr[key])) {
        return FilterUtils.equals(prev[key], curr[key])
      } else {
        return prev[key] === curr[key];
      }
    });
  }

  public static isEmpty(obj: Object): boolean {
    return Object.values(obj).every(val => {
      if (Utils.isObject(val)) {
        return FilterUtils.isEmpty(val);
      } else {
        return !val
      }
    });
  }

  public static includes(source: Object, filter: Object): boolean {
    return Object.keys(filter).every((key) => {
      if (!source[key] || !filter[key]) { return true; }

      if (Utils.isObject(source[key]) && Utils.isObject(filter[key])) {
        return FilterUtils.includes(source[key], filter[key]);
      } else {
        return source[key].toString().toLowerCase().includes(filter[key].toString().toLowerCase());
      }
    });
  }
}
