import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService, UserLoginService } from '../service/Login.service';

function passwordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.value;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()]/.test(password);
  const valid = hasDigit && hasLowercase && hasUppercase && hasSpecial;
  if (!valid) {
    return { invalidPassword: true };
  }
  return null;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  screenHeight: number = window.innerHeight;
  screenWidth: number = window.innerWidth;
  loginFormAdmin: FormGroup;
  loginFormUser: FormGroup;
  userLoginService: UserLoginService = inject(UserLoginService);
  adminLoginService: AdminLoginService = inject(AdminLoginService);
  images: string[] = [
    '../../assets/image1.webp',
    '../../assets/image1.webp',
    '../../assets/image1.webp',
  ];
  slideIndex = 0;
  invalidALID: string = '';
  invalidAPWD: string = '';
  invalidULID: string = '';
  invalidUPWD: string = '';
  invalidAttemptsUser: number = 0;
  invalidAttemptsAdmin: number = 0;
  userInvalidated: boolean = false;
  adminInvalidated: boolean = false;
  loginStatusUser: string = '';
  loginStatusAdmin: string = '';
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginFormAdmin = this.formBuilder.group({
      loginId: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern, passwordValidator],
      ],
    });
    this.loginFormUser = this.formBuilder.group({
      loginId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
    });
  }

  ngOnInit(): void {
    //this.showslides();
  }

  showslides() {
    let i;
    const slides = document.getElementsByClassName(
      'mySlides'
    ) as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1;
    }
    slides[this.slideIndex - 1].style.display = 'block';
    setTimeout(() => {
      this.showslides();
    }, 2000);
  }

  userLogin() {
    if (
      this.loginFormUser.controls['loginId'].invalid &&
      (this.loginFormUser.controls['loginId'].dirty ||
        this.loginFormUser.controls['loginId'].touched)
    ) {
      if (
        this.loginFormUser.controls['loginId'].errors &&
        this.loginFormUser.controls['loginId'].errors['required']
      )
        this.invalidULID = 'Login Id is mandatory';
      if (
        this.loginFormUser.controls['loginId'].errors &&
        this.loginFormUser.controls['loginId'].errors['email']
      )
        this.invalidULID = 'Not a valid email';
    } else {
      this.invalidULID = '';
    }

    if (
      this.loginFormUser.controls['password'].invalid &&
      (this.loginFormUser.controls['password'].dirty ||
        this.loginFormUser.controls['password'].touched)
    ) {
      if (
        this.loginFormUser.controls['password'].errors &&
        this.loginFormUser.controls['password'].errors['invalidPassword']
      )
        this.invalidUPWD =
          'Password must contain atlease one Upper, one Lower Case letter and one digit and one special character';
      if (
        this.loginFormUser.controls['password'].errors &&
        this.loginFormUser.controls['password'].errors['required']
      )
        this.invalidUPWD = 'Password is mandatory';
    } else {
      if (!this.userInvalidated) this.invalidUPWD = '';
    }
    if (this.invalidULID == '' && this.invalidUPWD == '') {
      const login = this.loginFormUser.get('loginId');
      const pwd = this.loginFormUser.get('password');
      if (this.invalidAttemptsUser < 3) {
        if (login && pwd) {
          this.loginStatusUser = this.userLoginService.userLogin(
            login.value,
            pwd.value
          );
        }
        this.invalidAttemptsUser =
          this.loginStatusUser === 'IP'
            ? this.invalidAttemptsUser + 1
            : this.loginStatusUser === 'UDE'
            ? this.invalidAttemptsUser
            : 0;
        if (this.loginStatusUser === 'Success')
          this.invalidUPWD = 'Login Success';
        else if (this.loginStatusUser === 'IP')
          this.invalidUPWD = 'Invalid Password';
        else {
          this.invalidULID = 'invalid Login';
          this.invalidUPWD = '';
        }
      } else if (!this.userInvalidated) {
        this.userInvalidated = true;
        setTimeout(() => {
          this.userInvalidated = false;
          this.invalidAttemptsUser = 0;
        }, 10000);
        this.invalidUPWD = 'Please try after 30 mins, max attempts exceeded';
      }
    }
  }
  adminLogin() {
    if (
      this.loginFormAdmin.controls['loginId'].invalid &&
      (this.loginFormAdmin.controls['loginId'].dirty ||
        this.loginFormAdmin.controls['loginId'].touched)
    ) {
      if (
        this.loginFormAdmin.controls['loginId'].errors &&
        this.loginFormAdmin.controls['loginId'].errors['required']
      )
        this.invalidALID = 'Login Id is mandatory';
      if (
        this.loginFormAdmin.controls['loginId'].errors &&
        this.loginFormAdmin.controls['loginId'].errors['email']
      )
        this.invalidALID = 'Not a valid email';
    } else {
      this.invalidALID = '';
    }

    if (
      this.loginFormAdmin.controls['password'].invalid &&
      (this.loginFormAdmin.controls['password'].dirty ||
        this.loginFormAdmin.controls['password'].touched)
    ) {
      if (
        this.loginFormAdmin.controls['password'].errors &&
        this.loginFormAdmin.controls['password'].errors['invalidPassword']
      )
        this.invalidAPWD =
          'Password must contain atlease one Upper, one Lower Case letter and one digit and one special character';
      if (
        this.loginFormAdmin.controls['password'].errors &&
        this.loginFormAdmin.controls['password'].errors['required']
      )
        this.invalidAPWD = 'Password is mandatory';
    } else {
      if (!this.adminInvalidated) this.invalidAPWD = '';
    }
    if (this.invalidALID == '' && this.invalidAPWD == '') {
      const login = this.loginFormAdmin.get('loginId');
      const pwd = this.loginFormAdmin.get('password');
      if (this.invalidAttemptsAdmin < 3) {
        if (login && pwd) {
          this.loginStatusAdmin = this.adminLoginService.adminLogin(
            login.value,
            pwd.value
          );
        }
        this.invalidAttemptsAdmin =
          this.loginStatusAdmin === 'IP'
            ? this.invalidAttemptsAdmin + 1
            : this.loginStatusAdmin === 'UDE'
            ? this.invalidAttemptsAdmin
            : 0;
        if (this.loginStatusAdmin === 'Success') {
          this.router.navigate(['home']);
        } else if (this.loginStatusAdmin === 'IP') {
          this.invalidAPWD = 'Invalid Password';
        } else {
          this.invalidALID = 'invalid Login';
          this.invalidAPWD = '';
        }
      } else if (!this.adminInvalidated) {
        this.adminInvalidated = true;
        setTimeout(() => {
          this.adminInvalidated = false;
          this.invalidAttemptsAdmin = 0;
        }, 10000);
        this.invalidAPWD = 'Please try after 30 mins, max attempts exceeded';
      }
    }
  }
}
