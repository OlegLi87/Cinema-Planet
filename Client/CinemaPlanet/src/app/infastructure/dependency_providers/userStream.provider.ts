import { User } from '../../models/user.model';
import { InjectionToken, Provider } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const USER_STREAM = new InjectionToken('Streams current app user.');

function UserStreamFactory(): BehaviorSubject<User> {
  return new BehaviorSubject<User>(null);
}

export const userStreamProvider: Provider = {
  provide: USER_STREAM,
  useFactory: UserStreamFactory,
};
