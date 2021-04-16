import { OverallStat } from './../../models/domain_models/overallStat.model';
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

  getOverallStatistics(): Observable<OverallStat> {
    return this.httpClient.get<OverallStat>(this.URL + '/getOverallStat');
  }
}
