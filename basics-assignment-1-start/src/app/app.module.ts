import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { warningAlert } from './warningAlert/app-warning-alert.component';
import { successAlert } from './successAlert/app-success-alert.component';

@NgModule({
  declarations: [
    AppComponent,warningAlert,successAlert
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
