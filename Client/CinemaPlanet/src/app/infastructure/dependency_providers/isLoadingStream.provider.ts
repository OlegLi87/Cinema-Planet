import { Subject } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { Provider } from '@angular/core';

export const IS_LOADING_STREAM = new InjectionToken(
  'A stream of boolean value reflecting there is loading process currently on'
);

function getIsLoadingStream(): Subject<boolean> {
  return new Subject<boolean>();
}

export const isLoadingStreamProvider: Provider = {
  provide: IS_LOADING_STREAM,
  useFactory: getIsLoadingStream,
};
