import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthRole, User } from './models/user.model';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { USER_STREAM } from './infastructure/dependency_providers/userStream.provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    @Inject(USER_STREAM) readonly $userStream: BehaviorSubject<User>,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.$userStream.subscribe((user) => {
      if (!user) this.router.navigate(['login']);
      else if (user.role === AuthRole.User) this.router.navigate(['app']);
      else if (user.role === AuthRole.Admin) this.router.navigate(['admin']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
