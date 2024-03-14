import { CommonModule } from "@angular/common";
import { Component,HostListener } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component(
    {
        selector:'P4p-paid_details',
        standalone:true,
        imports:[RouterLink,RouterOutlet,FormsModule,CommonModule],
        templateUrl:'../P4p-paid_details/P4p-paid_details.component.html',
        styles:'',
    }
)
export class P4pPaidDetailsComponent{
    windowHeight:number;
  centralComponentHeight:number;
  constructor(){
    this.windowHeight=window.innerHeight
    if(window.innerWidth>710){
    this.centralComponentHeight=this.windowHeight-86;
    }
    else{
      this.centralComponentHeight=this.windowHeight-120;
    }
    
  }
  @HostListener('window:resize',['$event'])
  OnResize(event:Event){
    this.windowHeight=window.innerHeight;
    if(window.innerWidth>710){
      this.centralComponentHeight=this.windowHeight-86;
      }
      else{
        this.centralComponentHeight=this.windowHeight-120;
      }
  }
}