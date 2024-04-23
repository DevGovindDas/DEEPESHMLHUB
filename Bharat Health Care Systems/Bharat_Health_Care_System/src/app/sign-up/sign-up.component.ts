import { Component, OnInit, inject } from '@angular/core';
import { LoginService } from '../service/Login.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/model/BHCS.model';

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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  screenHeight: number = window.innerHeight;
  screenWidth: number = window.innerWidth;
  signUpForm: FormGroup;


  loginService: LoginService = inject(LoginService);

  invalidULID: string = ' ';
  invalidUPWD: string = ' ';
  invalidName: string = ' ';
  invalidRole: string = ' ';
  userAddStatus: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      loginId: [' ', [Validators.required, Validators.email]],
      password: [
        ' ',
        [Validators.required, Validators.pattern, passwordValidator],
      ],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }


  userSignUp() {
    if (
      this.signUpForm.controls['loginId'].invalid &&
      (this.signUpForm.controls['loginId'].dirty ||
        this.signUpForm.controls['loginId'].touched)
    ) {
      if (
        this.signUpForm.controls['loginId'].errors &&
        this.signUpForm.controls['loginId'].errors['required']
      )
        this.invalidULID = 'Login Id is mandatory';
      if (
        this.signUpForm.controls['loginId'].errors &&
        this.signUpForm.controls['loginId'].errors['email']
      )
        this.invalidULID = 'Not a valid email';
    } else if(this.signUpForm.controls['loginId'].valid) {
      console.log(this.signUpForm.get('loginId')?.value, 'Login Id')
      this.invalidULID = '';
    }else{
      this.invalidULID = 'Please fill this field';
    }

    if (
      this.signUpForm.controls['name'].invalid &&
      (this.signUpForm.controls['name'].dirty ||
        this.signUpForm.controls['name'].touched)
    ) {
      if (
        this.signUpForm.controls['name'].errors &&
        this.signUpForm.controls['name'].errors['required']
      )
        this.invalidName = 'Name is mandatory';
    } else if(this.signUpForm.controls['name'].valid){
      this.invalidName = '';
    }else{
      this.invalidName = 'Please fill this field';
    }
    if (
      this.signUpForm.controls['role'].invalid &&
      (this.signUpForm.controls['role'].dirty ||
        this.signUpForm.controls['role'].touched)
    ) {
      if (
        this.signUpForm.controls['role'].errors &&
        this.signUpForm.controls['role'].errors['required']
      )
        this.invalidRole = 'Role is mandatory';
    } else  if(this.signUpForm.controls['role'].valid){
      this.invalidRole = '';
    }else{
      this.invalidRole = 'Please fill this field';
    }

    if (
      this.signUpForm.controls['password'].invalid &&
      (this.signUpForm.controls['password'].dirty ||
        this.signUpForm.controls['password'].touched)
    ) {
      if (
        this.signUpForm.controls['password'].errors &&
        this.signUpForm.controls['password'].errors['invalidPassword']
      )
        this.invalidUPWD =
          'Password must contain atlease one Upper, one Lower Case letter and one digit and one special character';
      if (
        this.signUpForm.controls['password'].errors &&
        this.signUpForm.controls['password'].errors['required']
      )
        this.invalidUPWD = 'Password is mandatory';
    } else if(this.signUpForm.controls['password'].valid){
      this.invalidUPWD = '';
    }else{
      this.invalidUPWD = 'Please fill this field';
    }
    if (this.invalidULID === '' && this.invalidUPWD === '' && this.invalidName === '' && this.invalidRole === '') {
      const login = this.signUpForm.get('loginId')?.value;
      const pwd = this.signUpForm.get('password')?.value;
      const name = this.signUpForm.get('name')?.value;
      const role = this.signUpForm.get('role')?.value;

      this.loginService.addUser(name, login, pwd, role).subscribe(response => {
        if (response) {
          console.log(response);
          this.userAddStatus = "USER ADDED SUCCESFULLY"
        }
      },
    error=>{
      this.userAddStatus = "USER ADDITION FALIURE"
    });
    } else{
      this.userAddStatus = '';
    }
  }
}
