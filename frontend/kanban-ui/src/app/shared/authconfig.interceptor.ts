import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    contentType = 'application/json';

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        if (req.headers.has('Content-Type'))
            this.contentType = req.headers.get('Content-Type');
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken,
                'Content-Type': this.contentType
            }
        });
        return next.handle(req);
    }
}