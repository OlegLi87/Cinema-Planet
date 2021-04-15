import { USER_STREAM } from '../../infastructure/dependency_providers/userStream.provider';
import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class MainGuardService implements CanActivate {
  constructor(
    @Inject(USER_STREAM) private $userStream: BehaviorSubject<User>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.$userStream.value;
    const path = route.url[0].path;

    if (path === 'login' && !user) {
      return true;
    } else if (path === 'admin' && user?.role === 'Admin') {
      return true;
    } else if (path === '' && user?.role === 'User') return true;

    return false;
  }
}
