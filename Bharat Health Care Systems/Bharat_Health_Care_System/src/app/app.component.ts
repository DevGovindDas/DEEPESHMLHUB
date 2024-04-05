import { Component, inject } from '@angular/core';
import { AdminLoginService, UserLoginService } from './service/Login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Bharat_Health_Care_System';
  profileVisible: boolean = false;
  adminLoginService: AdminLoginService = inject(AdminLoginService);
  userLoginService: UserLoginService = inject(UserLoginService);

  getAdminLogo() {
    return this.adminLoginService.getLoggedAdmin();
  }
  showLoginDetails() {
    this.profileVisible = !this.profileVisible;
  }
  adminLogOut() {
    this.adminLoginService.adminLogout();
  }
}
