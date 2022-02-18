import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map, retry }  from "rxjs/operators";
import { Login } from "./model/Login";
import { User } from "./model/User";
import { SnackbarCommon } from "./snackbar-common";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    endpoint: string = 'http://localhost:8080/kanban-app/api';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    currentUser: User;
    isLoginFailed: boolean;
    errorMessage: string;
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }  

    constructor(private http: HttpClient, public router: Router, public snackbar: SnackbarCommon) {
    }

    signUp(user: User): Observable<any> {
        let api = `${this.endpoint}/register`;
        user.login = user.username;
        return this.http.post<User>(api, JSON.stringify(user), this.httpOptions).pipe(retry(1), catchError(this.handleError));
    }

    signIn(user: Login) {
        let api = `${this.endpoint}/authenticate`;
        return this.http.post<any>(api, user).subscribe((res: any) =>{
            localStorage.setItem('access_token', res.token);
            console.log("Success:: token::", res.token);
            this.getUserHome(1).subscribe((res) => {
                this.currentUser = res;
                console.log("Current User::", this.currentUser);
                this.router.navigate(['home']);
            });         
        }, err => {
            if(err.error.status === 401) {
                this.errorMessage = "Invalid Login/Password!";
            } else {
                this.errorMessage = err.error.message;                
            }
             
            console.log(err.error);
            this.snackbar.openSnackBar( this.errorMessage, 5, "error-snackbar");
            this.isLoginFailed = true;
        });
    }

    getUserHome(id): Observable<any> {
        console.log("Logged In as::", id);
        let api = `${this.endpoint}/account`;
        return this.http.get(api, { headers: this.headers });
    }

    getToken() {
    return localStorage.getItem('access_token');
    }

    get isLoggedIn(): boolean {
        let authToken = localStorage.getItem('access_token');
        return (authToken !== null) ? true : false;
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
