import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  evenArray:number[]=[];
  oddArray:number[]=[];
  handleNumEmitter(num:number):void{
    if(num%2!==0){
      this.oddArray.push(num);
    }else{
      this.evenArray.push(num);
    }
  }
}
