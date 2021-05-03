import { Order } from './../../../models/domain_models/order.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class HttpDataService {
  private URL = environment.API_URL + '/user';

  constructor(private httpClient: HttpClient) {}

  getMovies(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL + '/getMovies');
  }

  getAvailableMovieSessions(movieId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.URL + '/getAvailableMovieSessions' + `?id=${movieId}`
    );
  }

  getAvailableSeatTypes(movieSessionId: number): Observable<string[]> {
    return this.httpClient.get<string[]>(
      this.URL + '/getAvailableSeatTypes' + `?id=${movieSessionId}`
    );
  }

  getOrders(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL + '/getOrders');
  }

  saveOrder(order: Order): Observable<any> {
    return this.httpClient.post(this.URL + '/saveOrder', order);
  }
}
