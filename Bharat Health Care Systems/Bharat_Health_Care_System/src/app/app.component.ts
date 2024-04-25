import { Component, inject } from '@angular/core';
import { LoginService } from './service/Login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Bharat_Health_Care_System';
  profileVisible: boolean = false;
  loginService: LoginService = inject(LoginService);
  constructor(private router:Router){}
  getLogo() {
    return this.loginService.getLoggedUser();
  }
  showLoginDetails() {
    this.profileVisible = !this.profileVisible;
  }
  logOut() {
    this.profileVisible = !this.profileVisible;
    this.loginService.logout().subscribe(data=>{
      this.loginService.loggedUser.name='None';
      this.router.navigate(['login']);
      console.log(data)
    });
  }
  homeNavigation(){
    if(this.loginService.loggedUser.role==='admin'){
      this.router.navigate(['home']);
    }else if(this.loginService.loggedUser.role==='user'){
      this.router.navigate(['userHome']);
    }
  }
}
