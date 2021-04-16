import { environment } from './../../../environments/environment';
import { LoginCredentials } from './../../models/login-credentials.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  private readonly URL = environment.API_URL + '/auth';

  constructor(private httpClient: HttpClient) {}

  signUp(loginCredentials: LoginCredentials): Observable<any> {
    return this.httpClient.post(this.URL + '/signup', loginCredentials);
  }

  signIn(loginCredentials: LoginCredentials): Observable<any> {
    return this.httpClient.post(this.URL + '/signin', loginCredentials);
  }

  signOut(token: string): Observable<any> {
    return this.httpClient.get(this.URL + '/signout');
  }

  validateToken(token: string): Observable<any> {
    return this.httpClient.get(this.URL + '/validateToken', {
      headers: { Authorization: 'Bearer ' + token },
    });
  }
}
