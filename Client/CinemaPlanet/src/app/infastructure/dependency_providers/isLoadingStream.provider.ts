import { BehaviorSubject } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { Provider } from '@angular/core';

export const IS_LOADING_STREAM = new InjectionToken(
  'A stream of boolean value reflecting there is loading process currently on'
);

function getIsLoadingStream(): BehaviorSubject<boolean> {
  return new BehaviorSubject<boolean>(false);
}

export const isLoadingStreamProvider: Provider = {
  provide: IS_LOADING_STREAM,
  useFactory: getIsLoadingStream,
};
