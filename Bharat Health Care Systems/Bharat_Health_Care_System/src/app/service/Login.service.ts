import { Injectable } from '@angular/core';
import { User } from '../BHCSInterface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
  private adminLoggedIn: boolean = false;
  private loggedAdmin?: string = '';
  redirectUrl: string = '/';
  constructor(private router: Router) {}

  private registeredAdmins: User[] = [
    { name: 'User1', userName: 'user1@x.com', password: 'Pwd1!' },
    { name: 'User2', userName: 'user2@y.com', password: 'Pwd2!' },
    { name: 'Test', userName: 't@y.com', password: 'Pw2!' },
  ];
  adminLogin(userName: string, password: string): string {
    for (var i = 0; i < this.registeredAdmins.length; i++) {
      if (this.registeredAdmins[i].userName === userName) {
        if (this.registeredAdmins[i].password !== password) return 'IP';
        else {
          this.loggedAdmin = this.registeredAdmins[i].name;
          this.adminLoggedIn = true;
          return 'Success';
        }
      }
    }
    return 'UDE';
  }
  adminLogout() {
    this.adminLoggedIn = false;
    this.loggedAdmin = '';
    this.router.navigate(['login']);
  }
  isAdminLoggedIn(): boolean {
    return this.adminLoggedIn;
  }
  getLoggedAdmin() {
    return this.loggedAdmin;
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  private userLoggedIn: boolean = false;
  private loggedUser?: string = '';
  redirectUrl: string = '/';
  constructor() {}

  private registeredUsers: User[] = [
    { name: 'User1', userName: 'user1@x.com', password: 'Pwd1!' },
    { name: 'User2', userName: 'user2@y.com', password: 'Pwd2!' },
  ];
  userLogin(userName: string, password: string): string {
    for (var i = 0; i < this.registeredUsers.length; i++) {
      if (this.registeredUsers[i].userName === userName) {
        if (this.registeredUsers[i].password !== password) return 'IP';
        else {
          this.loggedUser = this.registeredUsers[i].name;
          this.userLoggedIn = true;
          return 'Success';
        }
      }
    }
    return 'UDE';
  }
  userLogout() {
    this.userLoggedIn = false;
    this.loggedUser = '';
  }
  isUserLoggedIn(): boolean {
    return this.userLoggedIn;
  }
}
