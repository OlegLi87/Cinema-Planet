import { BehaviorSubject } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { Provider } from '@angular/core';

export const IS_LOADING_DATA_STREAM = new InjectionToken(
  'A stream of boolean value reflecting there is loading process currently on'
);

function getIsLoadingStream(): BehaviorSubject<boolean> {
  return new BehaviorSubject<boolean>(null);
}

export const isLoadingDataStreamProvider: Provider = {
  provide: IS_LOADING_DATA_STREAM,
  useFactory: getIsLoadingStream,
};
