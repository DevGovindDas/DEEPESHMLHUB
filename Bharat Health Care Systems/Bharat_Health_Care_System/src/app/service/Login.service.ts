import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/model/BHCS.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  redirectUrl: string = '/';
  loggedUser:User={
    name: "None",
    userName:"_" ,
    password: "",
    role:"",
    isLoggedIn:false,
    sessionId:"_"
  };
  constructor(private router: Router, private httpClient:HttpClient) {}

  login(userName: string, password: string):Observable<User>{
    var user={
      name: "None",
      userName:userName ,
      password: password,
      role:"",
      isLoggedIn:false,
      sessionId:""
    }
    return this.httpClient.post("http://localhost:8078/authenticate/login",user);
  }
  logout():Observable<any> {
    return this.httpClient.get("http://localhost:8078/authenticate/logout/"+this.loggedUser.userName);
  }
  isLoggedIn() {
    return this.httpClient.get("http://localhost:8078/authenticate/isLoggedIn/"+this.loggedUser.userName+"/"+this.loggedUser.sessionId);
  }
  getLoggedUser() {
    return this.loggedUser.name;
  }
  addUser(name:string,userName:string,password:string,role:string):Observable<User>{
    var user={
      name: name,
      userName:userName,
      password: password,
      role:role
    }
    return this.httpClient.post("http://localhost:8078/authenticate/addUser",user);
  }
}