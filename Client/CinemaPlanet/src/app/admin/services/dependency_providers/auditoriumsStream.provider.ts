import { Auditorium } from './../../../models/domain_models/auditorium.model';
import { BehaviorSubject } from 'rxjs';
import { InjectionToken, Provider } from '@angular/core';

export const AUDITORIUMS_STREAM = new InjectionToken(
  'Stream of auditoriums array'
);

function getAuditoriumsStream(): BehaviorSubject<Auditorium[]> {
  return new BehaviorSubject<Auditorium[]>(null);
}

export const auditoriumsStreamProvider: Provider = {
  provide: AUDITORIUMS_STREAM,
  useFactory: getAuditoriumsStream,
};
