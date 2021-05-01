import { Movie } from './../../../models/domain_models/movie.model';
import { BehaviorSubject } from 'rxjs';

import { InjectionToken, Provider } from '@angular/core';

export const MOVIES_STREAM = new InjectionToken('Stream of movies');

function getMoviesStream(): BehaviorSubject<Movie[]> {
  return new BehaviorSubject<Movie[]>(null);
}

export const moviesStreamProvider: Provider = {
  provide: MOVIES_STREAM,
  useFactory: getMoviesStream,
};
