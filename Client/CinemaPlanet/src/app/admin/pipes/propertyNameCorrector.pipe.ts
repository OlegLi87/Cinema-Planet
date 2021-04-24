import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertyNameCorrector',
})
export class PropertyNameCorrectorPipe implements PipeTransform {
  transform(propertyName: string, ...args: any[]): string {
    let res = '';

    if (propertyName.toLowerCase().indexOf('total') !== -1)
      propertyName = propertyName.substring('total'.length);

    res += propertyName[0].toUpperCase();

    for (let i = 1; i < propertyName.length - 1; i++) {
      res += propertyName[i];
      if (this.isInUpperCase(propertyName[i + 1])) res += ' ';
    }
    res += propertyName[propertyName.length - 1];
    return res;
  }

  private isInUpperCase(letter: string): boolean {
    return letter === letter.toUpperCase();
  }
}
