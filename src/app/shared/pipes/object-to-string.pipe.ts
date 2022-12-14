import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToString'
})
export class ObjectToStringPipe implements PipeTransform {

  transform(value: any, keys: string[] = []): string {
    const displayKeys = keys.length ? keys : Object.keys(value);
    return displayKeys.reduce(
      (accumulator, key) => `${accumulator}${value[key].toString()} `,
      ''
    ).trimEnd();
  }

}
