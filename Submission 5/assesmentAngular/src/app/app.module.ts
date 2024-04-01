import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ListCourseComponent } from './list-course/list-course.component';
import {HttpClientModule } from '@angular/common/http';
import { UpdateCourseComponent } from './update-course-sb/update-course-sb.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddCourseComponent,
    ListCourseComponent,
    AddCourseComponent,
    UpdateCourseComponent
  ],
  imports: [
  BrowserModule,
  ReactiveFormsModule,
  FormsModule,
  AppRoutingModule,
  HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
