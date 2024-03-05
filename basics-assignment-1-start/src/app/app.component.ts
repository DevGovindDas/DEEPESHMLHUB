import { Component } from '@angular/core';
import { warningAlert } from './warningAlert/app-warning-alert.component';
import { successAlert } from './successAlert/app-success-alert.component';
import { empty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name='';
  empty_user_name=true;
  editUsername(event:Event){
    this.name=(<HTMLInputElement> event.target).value;
    if(this.name==''){
      this.empty_user_name=true;
    }else{
      this.empty_user_name=false;
    }
  }
}
