import { AuthService } from './../../services/auth.service';
import { LoginCredentials } from './../../models/login-credentials.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  isInSignUpMode = false;
  isLoading = false;
  loginErrorMessage: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  toggleLoginMode(): void {
    this.isInSignUpMode = !this.isInSignUpMode;
    this.loginErrorMessage = null;
  }

  onSubmit(form: NgForm): void {
    let loginCredentials: LoginCredentials = {
      username: form.value.username,
      password: form.value.password,
      birthDate: form.value.birthDate,
    };
    this.isLoading = true;
    const response = this.authService.login(loginCredentials);
    response
      .catch((err) => (this.loginErrorMessage = err.error.Message))
      .finally(() => (this.isLoading = false));
  }
}
