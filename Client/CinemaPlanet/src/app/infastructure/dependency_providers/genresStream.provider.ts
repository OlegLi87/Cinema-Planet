import { BehaviorSubject } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { Provider } from '@angular/core';

export const GENRES_STREAM = new InjectionToken('Stream of movie genres');

function getGenresStream(): BehaviorSubject<string[]> {
  return new BehaviorSubject<string[]>(null);
}

export const genresStreamProvider: Provider = {
  provide: GENRES_STREAM,
  useFactory: getGenresStream,
};
