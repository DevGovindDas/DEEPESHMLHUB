import { Component, ElementRef, HostListener, OnInit, Renderer2, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { component_buttons, department, journey } from './interfaces/GssInterfaces';
import { GssServiceService } from './gss-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,NgFor,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
  verticalNavHeight1:number;
  verticalNavHeight2:number;
  constructor(){
    this.windowHeight=window.innerHeight
    this.centralComponentHeight=this.windowHeight-86;
    this.verticalNavHeight1=(500/540)*this.centralComponentHeight;
    this.verticalNavHeight2=this.centralComponentHeight-131;
  }
  @HostListener('window:resize',['$event'])
  OnResize(event:Event){
    this.windowHeight=window.innerHeight;
    this.centralComponentHeight=this.windowHeight-86;
    this.verticalNavHeight1=(500/540)*this.centralComponentHeight;
    this.verticalNavHeight2=this.centralComponentHeight-131;
  }

}
