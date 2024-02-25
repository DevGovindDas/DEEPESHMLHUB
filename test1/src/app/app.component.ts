import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GovernanceComponent } from './governance/governance.component';
import { FinanceComponent } from './finance/finance.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GovernanceComponent,RouterLink,FinanceComponent,FacilitiesComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test1';
  fixedNavVisible:boolean=false;
  visibleNav():void{
    this.fixedNavVisible=!this.fixedNavVisible;
  }
  windowHeight:number;
  centralComponentHeight:number;
  verticalNavHeight1:number;
  verticalNavHeight2:number;
  constructor(){
    this.windowHeight=window.innerHeight
    this.centralComponentHeight=this.windowHeight-86;
    this.verticalNavHeight1=this.centralComponentHeight-40;
    this.verticalNavHeight2=this.centralComponentHeight-131;
  }
  @HostListener('window:resize',['$event'])
  OnResize(event:Event){
    this.windowHeight=window.innerHeight;
    this.centralComponentHeight=this.windowHeight-86;
    this.verticalNavHeight1=this.centralComponentHeight-40;
    this.verticalNavHeight2=this.centralComponentHeight-131;
  }

}
