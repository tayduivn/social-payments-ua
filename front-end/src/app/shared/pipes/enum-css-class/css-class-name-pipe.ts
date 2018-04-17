import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

const cssClassNamePrefix = 'sp';

@Pipe({
  name: 'spCssClassNamePipe'
})
export class CssClassNamePipe implements PipeTransform {
  private static getEnumName(enumValue: any, EnumType: any) {
    return EnumType[enumValue];
  }

  public transform(enumValue: any, Enum: any): string {
    const name = CssClassNamePipe.getEnumName(arguments[0], arguments[1]);

    return `${cssClassNamePrefix}-${_.kebabCase(name)}`;
  }
}
