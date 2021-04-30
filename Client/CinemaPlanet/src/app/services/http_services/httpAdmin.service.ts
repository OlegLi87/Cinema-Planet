import { MovieSession } from './../../models/domain_models/movieSession.model';
import { Auditorium } from './../../models/domain_models/auditorium.model';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../models/domain_models/movie.model';

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

  getMovieSessions(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL + '/getMovieSessions');
  }

  getGenres(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.URL + '/getGenres');
  }

  saveAuditorium(auditorium: Auditorium): Observable<any> {
    return this.httpClient.post<any>(this.URL + '/saveAuditorium', auditorium);
  }

  saveMovie(movie: Movie): Observable<any> {
    return this.httpClient.post(this.URL + '/saveMovie', movie);
  }

  saveMovieSession(movieSession: MovieSession): Observable<any> {
    return this.httpClient.post<any>(
      this.URL + '/saveMovieSession',
      movieSession
    );
  }

  deleteAuditorium(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.URL + `/deleteAuditorium?id=${id}`
    );
  }

  deleteMovie(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.URL + `/deleteMovie?id=${id}`);
  }

  deleteMovieSession(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.URL + `/deleteMovieSession?id=${id}`
    );
  }
}
