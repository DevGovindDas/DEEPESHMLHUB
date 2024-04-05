import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminLoginService, UserLoginService } from './Login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthguardService implements CanActivate {
  private adminLoginService: AdminLoginService = inject(AdminLoginService);
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.adminLoginService.isAdminLoggedIn()) {
      return true;
    } else {
      this.adminLoginService.redirectUrl = state.url;
      this.router.navigate(['login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserAuthguardService implements CanActivate {
  constructor(
    private userLoginService: UserLoginService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.userLoginService.isUserLoggedIn()) {
      return true;
    } else {
      this.userLoginService.redirectUrl = state.url;
      this.router.navigate(['login']);
      return false;
    }
  }
}
