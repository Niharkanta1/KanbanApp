import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { envSettings } from '../env-settings';
import { User } from '../shared/model/User';
import { Router } from '@angular/router';
import { Login } from '../shared/model/Login';
import { AuthStatus } from '../shared/model/AuthStatus';
import { LoginResponse } from '../shared/model/LoginResponse';
import { JwtHelper } from '../shared/util/jwt-helper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  registerApi = `${envSettings.apiUrl}/register`;
  loginApi = `${envSettings.apiUrl}/authenticate`;
  currentUser?: User;
  isLoginFailed: boolean = false;
  errorMessage: string = '';
  signedin$ = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwt: JwtHelper
  ) {}

  signUp(user: User): Observable<any> {
    user.login = user.username;
    console.log('On Sign up....', user);
    return this.http.post<User>(this.registerApi, JSON.stringify(user)).pipe(
      tap((res) => {
        this.signedin$.next(AuthStatus.signedIn);
        this.currentUser = res;
      })
    );
  }

  signIn(user: Login) {
    return this.http.post<LoginResponse>(this.loginApi, user).pipe(
      tap((res) => {
        this.signedin$.next(AuthStatus.signedIn);
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('isLoggedIn', 'true');
        this.getUserFromToke(res.token);
        console.log('Login Successful...', res);
      })
    );
  }

  private handleLoginError(err: any) {
    if (err.error.status === 401) {
      this.errorMessage = 'Invalid Login/Password!';
    } else {
      this.errorMessage = err.error.message;
    }

    console.log(err.error);
    console.log(this.errorMessage);
    this.isLoginFailed = true;
  }

  getUserFromToke(token: string) {
    const { sub, Email, FullName, Roles, userId, exp } =
      this.jwt.decodeToken(token);
    if (!this.currentUser) this.currentUser = {} as User;
    this.currentUser.fullName = FullName;
    this.currentUser.id = userId;
    this.currentUser.email = Email;
    this.currentUser.authorities = [Roles];
    this.currentUser.username = sub;
    this.currentUser.login = sub;
    console.log('Current user:', this.currentUser);
    console.log('JWT Expired: ', this.jwt.checkExpirationTime(exp));
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    //console.log(authToken);
    return authToken !== null ? true : false;
  }

  removeToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('isLoggedIn');
  }

  doLogout(): boolean {
    localStorage.removeItem('access_token');
    localStorage.setItem('isLoggedIn', 'false');
    this.signedin$.next(AuthStatus.signedOut);
    console.log('Logout successful');
    return true;
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      console.log('Error::', error.error);
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => error);
  }
}
