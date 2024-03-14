import { Component, ElementRef, HostListener, OnInit, Renderer2, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { GssServiceService } from '../gss-service.service';
import { component_buttons } from '../interfaces/GssInterfaces';
import { department } from '../interfaces/GssInterfaces';
import { journey } from '../interfaces/GssInterfaces';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule,NgFor,RouterLink,RouterOutlet],
  templateUrl: './landing-page.component.html',
  styles: ''
})
export class LandingPageComponent {
    title = 'test1';
  fixedNavVisible:boolean=false;
  gss_service:GssServiceService=inject(GssServiceService);
  departments:department[]=this.gss_service.get_all_departments();
  all_components:component_buttons[]=this.gss_service.get_all_buttons();
  journeys:journey[]=this.gss_service.get_all_journeys();
  selected_components:component_buttons[]=[];
  label:any;
  
  handle_department_click(event:Event):void{
    this.label=(<HTMLButtonElement>event.target).textContent;
    this.selected_components=[];
    for(var i=0;i<this.all_components.length;i++){
      if(this.all_components[i].parent===this.label.toLowerCase()){
        this.selected_components.push(this.all_components[i])
      }
    }

  }
  handle_department_imgclick(name:String):void{
    console.log(name);
    this.label=name;
    this.selected_components=[];
    for(var i=0;i<this.all_components.length;i++){
      if(this.all_components[i].parent===this.label.toLowerCase()){
        console.log(this.label.toLowerCase())
        this.selected_components.push(this.all_components[i])
      }
    }
    console.log(this.selected_components);
  }
  short_name(name:String):String{
    var res=name.charAt(0);
    for(var i=0;i<name.length;i++){
      if(name.charAt(i)===' '&&name.length-1>i){
        
        res=res.concat(name.charAt(i+1));
      }
    }
    return res;
  }
  visibleNav():void{
    this.fixedNavVisible=!this.fixedNavVisible;
  }
  windowHeight:number;
  centralComponentHeight:number;
  constructor(){
    this.handle_department_imgclick('facilities');
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