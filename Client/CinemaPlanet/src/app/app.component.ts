import { HttpAuthService } from './services/http_services/httpAuthService.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user';
import { LocalStorageService } from './services/localStorage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { USER_STREAM } from './services/dependency_providers/user.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  constructor(
    private service: LocalStorageService,
    private httpAuthService: HttpAuthService,
    @Inject(USER_STREAM) readonly $stream: BehaviorSubject<User>
  ) {}

  ngOnInit() {
    console.log('app initialized');
  }

  send() {
    //this.httpAuthService.validateToken();
  }
}
