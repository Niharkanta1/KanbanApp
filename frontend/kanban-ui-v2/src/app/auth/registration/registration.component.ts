import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorResponse } from 'src/app/shared/model/ErrorResponse';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { PasswordMatchValidator } from 'src/app/shared/validator/password-match.validator';
import { User } from 'src/app/shared/model/User';
import { MatchPassword } from 'src/app/shared/validator/match-password';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  signupForm: FormGroup;
  @Input() error: string | null | undefined;
  errorMessage: string | undefined;
  errorResponse: ErrorResponse | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private matchPassword: MatchPassword,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        lastName: new FormControl(''),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ]),
        password2: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.email, Validators.required]),
        phoneNumber: new FormControl('', [Validators.pattern('[0-9]*')]),
      },
      { validators: this.matchPassword.validate }
    );
    this.authService.removeToken();
  }

  ngOnInit() {}

  onSubmit() {
    if (this.signupForm.invalid) return;

    this.authService.signUp(this.signupForm.value as User).subscribe({
      next: (response) => {
        //this.router.navigateByUrl('/home');
        console.log('navigating to homepage');
      },
      error: (err) => {
        if (err.status === 0) {
          this.signupForm.setErrors({ noConnection: true });
        } else {
          this.signupForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
