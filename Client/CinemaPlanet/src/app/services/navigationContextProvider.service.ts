import { AuthRole, User } from './../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { USER_STREAM } from './../infastructure/dependency_providers/userStream.provider';
import { Inject, Injectable } from '@angular/core';

export interface NavigationContext {
  homeUrl?: string;
  navLinks: { linkName: string; url: string }[];
}

@Injectable()
export class NavigationContextProviderService {
  constructor(
    @Inject(USER_STREAM) private $userStream: BehaviorSubject<User>
  ) {}

  getNavigationContext(): NavigationContext {
    const user = this.$userStream.value;
    if (!user) return null;
    if (user.role === AuthRole.Admin)
      return {
        homeUrl: '/admin',
        navLinks: [
          { linkName: 'Auditoriums', url: 'auditoriums' },
          { linkName: 'Movies', url: 'movies' },
          { linkName: 'Movie Sessions', url: 'movieSessions' },
        ],
      };
    if (user.role === AuthRole.User)
      return {
        homeUrl: '/app',
        navLinks: [{ linkName: 'Orders', url: '/app/orders' }],
      };
    return null;
  }
}
