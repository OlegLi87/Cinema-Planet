import { Auditorium } from './../../models/domain_models/auditorium.model';
import { OverallStat } from './../../models/domain_models/overallStat.model';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpAdminService {
  private readonly URL = environment.API_URL + '/admin';
  private DELAY = 250;

  constructor(private httpClient: HttpClient) {}

  getOverallStatistics(): Observable<OverallStat> {
    return this.httpClient
      .get<any>(this.URL + '/getOverallStat')
      .pipe(delay(this.DELAY), map<any, OverallStat>(this.mapToLowerCase));
  }

  getAuditoriums(): Observable<Auditorium[]> {
    return this.httpClient.get<any[]>(this.URL + '/getAuditoriums').pipe(
      delay(this.DELAY),
      map((data) => data.map<Auditorium>(this.mapToLowerCase))
    );
  }

  saveAuditorium(auditorium: Auditorium): Observable<any> {
    return this.httpClient
      .post<any>(this.URL + '/saveAuditorium', auditorium)
      .pipe(delay(this.DELAY));
  }

  deleteAuditorium(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(this.URL + `/deleteAuditorium/?id=${id}`)
      .pipe(delay(this.DELAY));
  }

  private mapToLowerCase<T>(dataObj: object): T {
    const keys = Object.keys(dataObj);
    const res = {} as T;

    keys.forEach((k) => {
      const keyStartWithLower = k[0].toLowerCase() + k.substring(1);
      res[keyStartWithLower] = dataObj[k];
    });
    return res;
  }
}
