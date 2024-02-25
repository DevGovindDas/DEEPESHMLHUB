import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-bulb-toggle-theme-changer',
  standalone: true,
  imports: [CommonModule,NgFor,RouterLink],
  templateUrl: './bulb-toggle-theme-changer.component.html',
  styleUrls: ['./../bootstrap.css','./bulb-toggle-theme-changer.component.css'],
})
export class BulbToggleThemeChangerComponent {
  isDarkTheme:boolean=true;
  isBulbOn:boolean=false;
  bulbCount:number[]=[1];
  toggleTheme():void{
    this.isDarkTheme=!this.isDarkTheme;
    this.isBulbOn=!this.isBulbOn;
  }
  toggleBulb():boolean{
    if(this.isBulbOn==true){
      if(this.bulbCount.indexOf(1)>=0){
        this.bulbCount.pop();
      }else{
  
      }
    }else{
      this.bulbCount.push(1);
    }
    return this.isBulbOn;
  }
}
