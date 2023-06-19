import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  contentType: string = 'application/json';

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getToken();
    if (request.headers.has('Content-Type'))
      this.contentType = request.headers.get('Content-Type') as string;
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,
        'Content-Type': this.contentType,
      },
    });
    return next.handle(request);
  }
}
