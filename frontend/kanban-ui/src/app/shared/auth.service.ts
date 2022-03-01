import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map, retry }  from "rxjs/operators";
import { envSettings } from "../env-settings";
import { Login } from "./model/Login";
import { User } from "./model/User";
import { SnackbarCommon } from "./snackbar-common";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    registerApi = `${envSettings.apiUrl}/register`;
    loginApi = `${envSettings.apiUrl}/authenticate`;
    currentUser: User;
    isLoginFailed: boolean;
    errorMessage: string;

    constructor(private http: HttpClient, public router: Router, public snackbar: SnackbarCommon) {
    }

    signUp(user: User): Observable<any> {
        user.login = user.username;
        return this.http.post<User>(this.registerApi, JSON.stringify(user)).pipe(catchError(this.handleError));
    }

    signIn(user: Login) {
        return this.http.post<any>(this.loginApi, user).subscribe((res: any) =>{
            localStorage.setItem('access_token', res.token);
            console.log("Success:: token::", res.token);
            this.getUserHome(1).subscribe((res) => {
                this.currentUser = res;
                console.log("Current User::", this.currentUser);
                this.router.navigate(['home']);
            });         
        }, err => {
            this.handleLoginError(err);
        });
    }

    private handleLoginError(err: any) {
        if (err.error.status === 401) {
            this.errorMessage = "Invalid Login/Password!";
        } else {
            this.errorMessage = err.error.message;
        }

        console.log(err.error);
        this.snackbar.openSnackBar(this.errorMessage, 5, "error-snackbar");
        this.isLoginFailed = true;
    }

    getUserHome(id): Observable<any> {
        console.log("Logged In as::", id);
        let api = `${envSettings.apiUrl}/account`;
        return this.http.get(api, { headers: this.headers });
    }

    getToken() {
    return localStorage.getItem('access_token');
    }

    get isLoggedIn(): boolean {
        let authToken = localStorage.getItem('access_token');
        return (authToken !== null) ? true : false;
    }

    removeToken() {
        localStorage.removeItem('access_token');
    }

    doLogout() {
        let removeToken = localStorage.removeItem('access_token');
        if (removeToken == null) {
          this.router.navigate(['welcome']);
        }
        console.log("Logout successful");
    }
    
    handleError(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.snackbar.openSnackBar(errorMessage, 5, 'error-snackbar');
        return throwError(errorMessage);
    }
}
