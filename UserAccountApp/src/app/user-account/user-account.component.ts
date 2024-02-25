import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, numberAttribute } from '@angular/core';
import {UserformInterface} from '../interfaces/userFormInterface.interface';
import { FormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './user-account.component.html',
  styleUrls:[ './../bootstrap.css','./user-account.component.css'],
})
export class UserAccountComponent implements OnInit {
  days: number[]=[];
  months: String[]=['January','February','March','April','May','June','July','August','September','October','November','December'];
  years: number[]=[];
  hasPendingChanges:boolean=true;
  user:UserformInterface={
    firstName:'',
    surName:"",
    mobileEmail:"",
    password:"",
    dob:{day:0,month:"",year:0},
    gender:""
  };
  ngOnInit(): void {
    
  }
  constructor(){
    this.generateOptions(1,31,this.days);
    this.generateOptions(1900,2099,this.years);
  }
  generateOptions(start:number, end:number,days:number[]){
    for(let i=start; i<=end;i++){
      days.push(i);
    }
  }
  isValidMobileNo():boolean{
    if(this.user.mobileEmail.length!=10) return false;
    for(let i=0;i<this.user.mobileEmail.length;i++){
      if(this.user.mobileEmail.charCodeAt(i)<48&&this.user.mobileEmail.charCodeAt(i)>57){
          return false;
      }
    }
    return true;
  }
  isValidEmail():boolean{
    if(this.user.mobileEmail.endsWith('.com')&&this.user.mobileEmail.includes('@')&&this.user.mobileEmail.indexOf('@')>0)
    return true;
    return false;
  }
}
