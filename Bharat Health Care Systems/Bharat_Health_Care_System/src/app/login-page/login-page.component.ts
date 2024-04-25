import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/Login.service';
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
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  screenHeight: number = window.innerHeight;
  screenWidth: number = window.innerWidth;
  loginForm: FormGroup;
  image:string='';
  
  loginService: LoginService = inject(LoginService);
  images: string[] = [
    '../../assets/image1.webp',
    '../../assets/image1.webp',
    '../../assets/image1.webp',
  ];
  slideIndex = 0;
  invalidULID: string = '';
  invalidUPWD: string = '';
  user:User={};
  userInvalidated:boolean=false;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      loginId: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern, passwordValidator],
      ],
    });
    this.image=this.images[0];
  }

  ngOnInit(): void {
  }



  userLogin() {
    if (
      this.loginForm.controls['loginId'].invalid &&
      (this.loginForm.controls['loginId'].dirty ||
        this.loginForm.controls['loginId'].touched)
    ) {
      if (
        this.loginForm.controls['loginId'].errors &&
        this.loginForm.controls['loginId'].errors['required']
      )
        this.invalidULID = 'Login Id is mandatory';
      if (
        this.loginForm.controls['loginId'].errors &&
        this.loginForm.controls['loginId'].errors['email']
      )
        this.invalidULID = 'Not a valid email';
    } else {
      this.invalidULID = '';
    }

    if (
      this.loginForm.controls['password'].invalid &&
      (this.loginForm.controls['password'].dirty ||
        this.loginForm.controls['password'].touched)
    ) {
      if (
        this.loginForm.controls['password'].errors &&
        this.loginForm.controls['password'].errors['invalidPassword']
      )
        this.invalidUPWD =
          'Password must contain atlease one Upper, one Lower Case letter, one digit and one special character';
      if (
        this.loginForm.controls['password'].errors &&
        this.loginForm.controls['password'].errors['required']
      )
        this.invalidUPWD = 'Password is mandatory';
    } else {
      if (!this.userInvalidated) this.invalidUPWD = '';
    }
    if (this.invalidULID == '' && this.invalidUPWD == '') {
      const login = this.loginForm.get('loginId')?.value;
      const pwd = this.loginForm.get('password')?.value;
      this.loginService.login(login,pwd).subscribe(data=>{
        this.user=data;
        this.loginService.loggedUser=data;
        if(this.user.errorMessage==="MLNA"){
          this.invalidUPWD = 'Multiple Logins Not Allowed';
          this.invalidULID='';
        }else if(this.user.errorMessage==="Does Not Exist"){
          this.invalidULID='This Username does not exist'
          this.invalidUPWD='';
        }else if(this.user.errorMessage==="Wrong Password"){
          this.invalidUPWD = 'Wrong Password';
          this.invalidULID='';
        }else if(this.user.errorMessage==="MAE"){
          this.invalidUPWD='You have exceeded the maximum limits, try after 30 mins';
          this.invalidULID='';
        }else if(this.user.role==='admin'){
          this.invalidUPWD='Login Success';
          this.router.navigate(['home']);
        }else if(this.user.role==='user'){
          this.invalidUPWD='Login Success';
          this.router.navigate(['userHome']);
        }
      });
    }
  }
  signUp(){
    this.router.navigate(['signUp']);
  }   
}
