import { BehaviorSubject } from 'rxjs';
import { Movie } from './../../../models/domain_models/movie.model';
import { InjectionToken, Provider } from '@angular/core';

export const MOVIES_STREAM = new InjectionToken(
  'Stream of movies of the user section.'
);

function getMovieStream(): BehaviorSubject<Movie[]> {
  return new BehaviorSubject<Movie[]>(null);
}

export const moviesStreamProvider: Provider = {
  provide: MOVIES_STREAM,
  useFactory: getMovieStream,
};
