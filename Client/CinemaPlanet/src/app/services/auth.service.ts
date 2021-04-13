import { HttpAuthService } from './http_services/httpAuthService.service';
import { BehaviorSubject } from 'rxjs';
import { USER_STREAM } from '../infastructure/dependency_providers/userStream.provider';
import { LocalStorageService } from './localStorage.service';
import { Inject, Injectable } from '@angular/core';
import { User } from '../models/user';
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

  async streamUser(): Promise<void> {
    const user = await this.getUser();
    this.$userStream.next(user);
  }

  private async getUser(): Promise<User> {
    try {
      const token = this.localStorageService.getItem(this.LOCAL_STORAGE_KEY);
      const payload: { [key: string]: string } = jwtDecode(token);
      const isValidToken = await this.validateToken(token);
      if (!isValidToken) {
        this.localStorageService.removeItem(this.LOCAL_STORAGE_KEY);
        return null;
      } else return new User(payload.userName, payload.role, token);
    } catch (e) {
      return null;
    }
  }

  private async validateToken(token: string): Promise<boolean> {
    const $validationStream = this.httpAuthService.validateToken(token);
    const isValid: boolean = await new Promise((res) => {
      $validationStream.subscribe(
        (rs) => res(true),
        (err) => res(false)
      );
    });
    return isValid;
  }
}
