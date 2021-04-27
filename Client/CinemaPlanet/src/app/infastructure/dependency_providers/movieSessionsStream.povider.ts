import { BehaviorSubject } from 'rxjs';
import { MovieSession } from './../../models/domain_models/movieSession.model';
import { InjectionToken, Provider } from '@angular/core';

export const MOVIE_SESSIONS_STREAM = new InjectionToken(
  'Stream of movie sessions'
);

function getMovieSessionsStream(): BehaviorSubject<MovieSession[]> {
  return new BehaviorSubject<MovieSession[]>(null);
}

export const movieSessionsStreamProvider: Provider = {
  provide: MOVIE_SESSIONS_STREAM,
  useFactory: getMovieSessionsStream,
};
