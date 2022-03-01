import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Input() error: string | null;
  errorMessage: string;

  constructor(public formBuilder: FormBuilder, 
              public authService: AuthService, 
              public router: Router) {
    this.loginForm = this.formBuilder.group({
      login: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
      rememberMe: ['']
    });
    this.authService.removeToken();
   }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.signIn(this.loginForm.value);
  }

  get login() { return this.loginForm.get('login')}
  get password()  { return this.loginForm.get('password')}

  getError(el) {
    switch (el) {
      case 'user':
        if (this.login.hasError('required')) {
          return 'Username required';
        }
        if (this.login.hasError('maxlength') || this.login.hasError('minlength')) {
          return 'Username must be of lenght minimum 4 to 50.';
        }
        break;
      case 'pass':
        if (this.password.hasError('required')) {
          return 'Password required';
        }
        if (this.password.hasError('maxlength') || this.password.hasError('minlength')) {
          return 'Password must be of lenght minimum 4 to 100.';
        }
        break;
      default:
        return '';
    }
  }
}
