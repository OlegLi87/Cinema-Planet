import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'overallStatProperty',
})
export class OverallStatPropertyPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    value = value.substring('total'.length);
    let res = '';

    for (let i = 0; i < value.length - 1; i++) {
      res += value[i];
      if (this.isInUpperCase(value[i + 1])) res += ' ';
    }
    res += value[value.length - 1];
    return res;
  }

  private isInUpperCase(letter: string): boolean {
    return letter === letter.toUpperCase();
  }
}
