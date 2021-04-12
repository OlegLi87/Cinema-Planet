import { AuthService } from '../../services/auth.service';
import { APP_INITIALIZER, Provider } from '@angular/core';

function initUser(authService: AuthService) {
  return function (): Promise<void> {
    return authService.streamUser();
  };
}

export const initUserAtAppStart: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initUser,
  deps: [AuthService],
  multi: true,
};
