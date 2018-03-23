import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

const cssClassNamePrefix = 'sp';

export type Function = () => any;

@Pipe({
  name: 'cssClassNamePipe'
})
export class CssClassNamePipe implements PipeTransform {
  private static getEnumName(enumValue: any, EnumType: any) {
    return EnumType[enumValue];
  }

  private static getFunctionName(val): string {
    return val.name;
  }

  public transform(enumValue: any, EnumType: any): string;
  public transform(functionType: Function): string;
  public transform(val: any): string {
    let name: string;

    switch (typeof val) {
      case 'function':
        name = CssClassNamePipe.getFunctionName(arguments[0]);
        break;
      default:
        name = CssClassNamePipe.getEnumName(arguments[0], arguments[1]);
    }

    return `${cssClassNamePrefix}-${_.kebabCase(name)}`;
  }
}
