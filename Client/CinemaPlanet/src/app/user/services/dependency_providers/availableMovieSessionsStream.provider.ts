import { Subject } from 'rxjs';
import { InjectionToken, Provider } from '@angular/core';

export const AVAILABLE_MOVIE_SESSIONS_STREAM = new InjectionToken(
  'Stream of available dates for a specific session'
);

function getAvailableSessionDatesStream(): Subject<Date[]> {
  return new Subject<Date[]>();
}

export const availableSessionDatesStreamProvider: Provider = {
  provide: AVAILABLE_MOVIE_SESSIONS_STREAM,
  useFactory: getAvailableSessionDatesStream,
};
