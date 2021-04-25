import { Auditorium } from './../../models/domain_models/auditorium.model';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpAdminService {
  private readonly URL = environment.API_URL + '/admin';

  constructor(private httpClient: HttpClient) {}

  getOverallStatistics(): Observable<any> {
    return this.httpClient.get<any>(this.URL + '/getOverallStat');
  }

  getAuditoriums(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL + '/getAuditoriums');
  }

  getMovies(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL + '/getMovies');
  }

  getGenres(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.URL + '/getGenres');
  }

  saveAuditorium(auditorium: Auditorium): Observable<any> {
    return this.httpClient.post<any>(this.URL + '/saveAuditorium', auditorium);
  }

  deleteAuditorium(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.URL + `/deleteAuditorium/?id=${id}`
    );
  }
}
