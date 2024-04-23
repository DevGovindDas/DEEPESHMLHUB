import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, first, map, of } from 'rxjs';
import { LoginService } from './Login.service';


@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  private loginService: LoginService = inject(LoginService);
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    Observable<boolean>
     {
      return this.loginService.isLoggedIn().pipe(map((data)=>{
      if (data===true) {
        console.log(data,'Testing')
        return true;
      } else {
        this.loginService.redirectUrl = state.url;
        this.router.navigate(['']);
        return false;
      }
    }
    ),
     catchError(error=>{
      this.router.navigate(['']);
      return of(false);
     }) );
  
  }
}