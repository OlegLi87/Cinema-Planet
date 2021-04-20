import { Auditorium } from './../../models/domain_models/auditorium.model';
import { OverallStat } from './../../models/domain_models/overallStat.model';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpAdminService {
  private readonly URL = environment.API_URL + '/admin';

  constructor(private httpClient: HttpClient) {}

  getOverallStatistics(): Observable<OverallStat> {
    return this.httpClient
      .get<OverallStat>(this.URL + '/getOverallStat')
      .pipe(delay(500));
  }

  getAuditoriums(): Observable<Auditorium[]> {
    return this.httpClient
      .get<Auditorium[]>(this.URL + '/getAuditoriums')
      .pipe(delay(500));
  }

  saveAuditorium(auditorium: Auditorium): Observable<Auditorium> {
    return this.httpClient
      .post<Auditorium>(this.URL + '/saveAuditorium', auditorium)
      .pipe(delay(500));
  }
}
