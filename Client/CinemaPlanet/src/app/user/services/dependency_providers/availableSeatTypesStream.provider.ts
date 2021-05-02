import { Subject } from 'rxjs';
import { InjectionToken, Provider } from '@angular/core';

export const AVAILABLE_SEAT_TYPES_STREAM = new InjectionToken(
  'Stream of available seat types for a specific session on specific date'
);

function getAvailableSeatTypesStream(): Subject<string[]> {
  return new Subject<string[]>();
}

export const availableSeatTypesStreamProvider: Provider = {
  provide: AVAILABLE_SEAT_TYPES_STREAM,
  useFactory: getAvailableSeatTypesStream,
};
