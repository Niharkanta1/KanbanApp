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
    console.log("Interceptor:", request);
    const authToken = this.authService.getToken();      
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,
        'Content-Type': this.contentType,
      },
    });
    return next.handle(request);
  }
}
