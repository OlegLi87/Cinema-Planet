import { LoginCredentials } from './../models/login-credentials.model';
import { HttpAuthService } from './http_services/httpAuth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { USER_STREAM } from '../infastructure/dependency_providers/userStream.provider';
import { LocalStorageService } from './localStorage.service';
import { Inject, Injectable } from '@angular/core';
import { AuthRole, User } from '../models/user.model';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private LOCAL_STORAGE_KEY = 'JWTToken';

  constructor(
    private localStorageService: LocalStorageService,
    private httpAuthService: HttpAuthService,
    @Inject(USER_STREAM) private $userStream: BehaviorSubject<User>
  ) {}

  async streamUserAtAppInit(): Promise<void> {
    const user = await this.getUser();
    this.$userStream.next(user);
  }

  login(loginCredentials: LoginCredentials): Promise<void | string> {
    let $loginStream: Observable<any>;
    if (loginCredentials.birthDate)
      $loginStream = this.httpAuthService.signUp(loginCredentials);
    else $loginStream = this.httpAuthService.signIn(loginCredentials);

    return new Promise((res, rej) => {
      // imitating network latency
      setTimeout(() => {
        $loginStream.subscribe(
          (token) => {
            const user = this.createUserFromToken(token);
            if (user)
              this.localStorageService.saveItem(this.LOCAL_STORAGE_KEY, token);
            this.$userStream.next(user);
            res();
          },
          (err) => rej(err)
        );
      }, 2000);
    });
  }

  logout(): void {
    const token = this.localStorageService.getItem(this.LOCAL_STORAGE_KEY);
    this.httpAuthService.signOut(token).subscribe((res) => {
      this.localStorageService.removeItem(this.LOCAL_STORAGE_KEY);
      this.$userStream.next(null);
    });
  }

  private async getUser(): Promise<User> {
    const token = this.localStorageService.getItem(this.LOCAL_STORAGE_KEY);
    if (!token) return null;
    const isValidToken = await this.validateToken(token);
    if (!isValidToken) {
      this.localStorageService.removeItem(this.LOCAL_STORAGE_KEY);
      return null;
    } else return this.createUserFromToken(token);
  }

  private validateToken(token: string): Promise<boolean> {
    const $validationStream = this.httpAuthService.validateToken(token);
    return new Promise((res) => {
      $validationStream.subscribe(
        (rs) => res(true),
        (err) => res(false)
      );
    });
  }

  private createUserFromToken(token: string): User {
    try {
      const payload: { [key: string]: string } = jwtDecode(token);
      const role = payload.role === 'Admin' ? AuthRole.Admin : AuthRole.User;
      const user = new User(payload.name, role, token);
      return user;
    } catch (err) {
      return null;
    }
  }
}
