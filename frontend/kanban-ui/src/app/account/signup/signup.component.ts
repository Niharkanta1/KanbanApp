import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { SnackbarCommon } from 'src/app/shared/snackbar-common';
import { passwordMatchValidator } from 'src/app/shared/validators/passwordMatch.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  @Input() error: string | null;
  errorMessage: string;

  constructor(public formBuilder: FormBuilder, 
              public authService: AuthService,
              public snackbar: SnackbarCommon, 
              public router: Router) {
    this.signupForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
      lastName: new FormControl(''),
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
      password2: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phoneNumber: new FormControl('', [Validators.pattern('[0-9]*')])
    }, { validators: passwordMatchValidator});    

  }

  ngOnInit() {
  }

  registerMe(): void {
    this.authService.signUp(this.signupForm.value).subscribe((res: string) => {
      if(res.includes('User created')) {
        this.snackbar.openSnackBar("Sign up successful! Please login with your username or email.", 5, 'success-snackbar');
        this.router.navigate(['/login']);
      } else {
        this.snackbar.openSnackBar("Something wrong! Please Try again.", 5, 'error-snackbar');
      }
    });
  }

  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName') }
  get userName() { return this.signupForm.get('username') }
  get password() { return this.signupForm.get('password'); }
  get password2() { return this.signupForm.get('password2'); }
  get email() { return this.signupForm.get('email') }
  get phoneNumber() { return this.signupForm.get('phoneNumber') }

  onPasswordInput() {
    if (this.signupForm.hasError('passwordMismatch'))
      this.password2.setErrors([{'passwordMismatch': true}]);
    else
      this.password2.setErrors(null);
  }

  getError(match) {
    switch (match) {
      case 'firstName':
        if (this.firstName.hasError('required')) {
          return 'First Name is required';
        }
        if (this.firstName.hasError('pattern')) {
          return 'First Name can only contains A-Z, a-z and Space';
        }
        break;
      case 'userName':
        if (this.userName.hasError('required')) {
          return 'Username is required';
        }
        if (this.userName.hasError('maxlength') || this.userName.hasError('minlength')) {
          return 'Username must be of lenght minimum 4 to 50.';
        }
        break;
      case 'password':
        if (this.password.hasError('required')) {
          return 'Password is required';
        }
        if (this.password.hasError('maxlength') || this.password.hasError('minlength')) {
          return 'Password must be of lenght minimum 4 to 100.';
        }
        break;
      case 'password2':
        if (this.password2.hasError('required')) {
          return 'Confim the password again';
        } else if (this.password2.invalid) {
          return "Passwords don't match";
        }
        break;
      case 'email':
        if (this.email.hasError('required')) {
          return 'Email is required';
        }
        break;
      case 'phoneNo':
        if (this.phoneNumber.hasError('pattern')) {
          return 'Phone Number can contain only 0-9';
        }
        break;
      default:
        return '';
    }
  }

}
