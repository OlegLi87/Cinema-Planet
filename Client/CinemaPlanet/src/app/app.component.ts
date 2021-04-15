import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';
import { Component, Inject, OnInit } from '@angular/core';
import { USER_STREAM } from './infastructure/dependency_providers/userStream.provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(USER_STREAM) readonly $userStream: BehaviorSubject<User>,
    private router: Router
  ) {}

  ngOnInit() {
    this.$userStream.subscribe((user) => {
      if (!user) this.router.navigate(['login']);
      else if (user.role === 'User') this.router.navigate(['']);
      else if (user.role === 'Admin') this.router.navigate(['admin']);
    });
  }
}
