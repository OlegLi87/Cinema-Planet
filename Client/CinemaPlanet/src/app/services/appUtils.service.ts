import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppUtilsService {
  mapToLowerCase<T>(dataObj: object): T {
    if (!dataObj) return;
    const keys = Object.keys(dataObj);
    const result = {} as T;

    keys.forEach((k) => {
      const keyStartWithLower = k[0].toLowerCase() + k.substring(1);
      result[keyStartWithLower] = dataObj[k];
    });
    return result;
  }

  mapToDate(dateStr: any): Date {
    return new Date(Date.parse(dateStr));
  }
}
