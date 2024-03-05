import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.css'
})
export class GameControlComponent implements OnInit, OnDestroy{
  @Output() numEmitter=new EventEmitter<number>();
  private subscription:Subscription;
  num:number=0;
  gameRunner:boolean=false;
  ngOnInit(): void {
   const source=interval(1000);
   this.subscription=source.subscribe(()=>{
    if(this.gameRunner){
      this.num=this.num+1;
      this.numEmitter.emit(this.num);
    }
   })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  start(){
    this.gameRunner=true;
  }
  stop(){
    this.gameRunner=false;
  }
}
