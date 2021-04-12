import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  private readonly URL = 'http://localhost:56950/api/auth';

  constructor(private httpClient: HttpClient) {}

  signUp() {}

  signIn() {}

  signOut() {}

  validateToken(token: string): Observable<HttpResponse<any>> {
    return this.httpClient.get(this.URL + '/validateToken', {
      headers: { Authorization: 'Bearer ' + token },
      observe: 'response',
    });
  }
}
