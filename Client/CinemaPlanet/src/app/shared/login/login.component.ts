import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  isInSignUpMode = false;

  constructor() {}

  ngOnInit(): void {}

  toggleLoginMode(): void {
    this.isInSignUpMode = !this.isInSignUpMode;
  }
}
