import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/notifications/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Input() error: string | null | undefined;
  errorMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationsService
  ) {
    this.loginForm = this.formBuilder.group({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^[A-Za-z0-9]+$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      rememberMe: [''],
    });
    this.authService.removeToken();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.authService.signIn(this.loginForm.value).subscribe({
      next: () => {
        this.notificationService.addSuccess('Login successful');
        this.router.navigateByUrl('/dashboard');
      },
      error: ({ error }) => {
        this.loginForm.setErrors({ credentials: true });
        this.notificationService.addError('Login Failed');
      },
    });
  }

  get login() {
    return this.loginForm.get('login');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
