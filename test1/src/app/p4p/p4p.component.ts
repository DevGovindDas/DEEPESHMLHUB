import { Component, ElementRef, HostListener, OnInit, Renderer2, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-p4p',
  standalone: true,
  imports: [CommonModule,NgFor,RouterLink,RouterOutlet],
  templateUrl: './p4p.component.html',
  styles: ''
})
export class P4pComponent {
    windowHeight:number;
  centralComponentHeight:number;
  constructor(){
    this.windowHeight=window.innerHeight
    if(window.innerWidth>710){
    this.centralComponentHeight=this.windowHeight-72;
    }
    else{
      this.centralComponentHeight=this.windowHeight-110;
    }
    
  }
  @HostListener('window:resize',['$event'])
  OnResize(event:Event){
    this.windowHeight=window.innerHeight;
    if(window.innerWidth>710){
      this.centralComponentHeight=this.windowHeight-72;
      }
      else{
        this.centralComponentHeight=this.windowHeight-110;
      }
  }
}