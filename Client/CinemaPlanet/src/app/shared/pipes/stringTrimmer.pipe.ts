import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringTrimmer',
})
export class StringTrimmerPipe implements PipeTransform {
  transform(value: string, maxLength: number) {
    if (value.length < maxLength) return value;
    return value.substring(0, maxLength) + '...';
  }
}
