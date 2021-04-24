import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringTrimmer',
})
export class StringTrimmerPipe implements PipeTransform {
  MAX_STRING_LENGTH = 13;

  transform(value: string, ...args: any[]) {
    if (value.length < this.MAX_STRING_LENGTH) return value;
    return value.substring(0, this.MAX_STRING_LENGTH) + '...';
  }
}
