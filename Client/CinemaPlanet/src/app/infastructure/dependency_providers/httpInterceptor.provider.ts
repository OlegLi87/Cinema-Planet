import { USER_STREAM } from './userStream.provider';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Inject, Injectable, Provider } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { delay } from 'rxjs/operators';

@Injectable()
class HttpInterceptorService implements HttpInterceptor {
  constructor(
    @Inject(USER_STREAM) private $userStream: BehaviorSubject<User>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.$userStream.value;
    if (!user) return next.handle(req);
    else {
      const token = user.token;
      const modifiedReq = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + token),
      });
      return next.handle(modifiedReq).pipe(delay(250)); // imitating network latency
    }
  }
}

export const httpInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpInterceptorService,
  multi: true,
};
