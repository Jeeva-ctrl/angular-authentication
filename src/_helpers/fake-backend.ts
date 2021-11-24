import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../models';

const users: User[] = [
  {
    id: 1,
    username: 'test',
    firstName: 'test',
    password: 'test',
    lastName: 'test',
  },
];
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();

        default:
          return next.handle(request);
      }
    }
    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) return error('Username or password is incorrect');

      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token',
      });
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorized' } });
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
