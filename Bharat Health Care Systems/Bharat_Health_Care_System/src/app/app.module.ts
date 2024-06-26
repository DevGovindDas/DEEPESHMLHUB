import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HospitalComponent } from './hospital/hospital.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PatientComponent } from './patient/patient.component';
import { AppRoutingModule } from './app-routing.module';
import { AddDoctorComponent } from './doctor/addDoctor/add_doctor.component';
import { UpdateDoctorComponent } from './doctor/updateDoctor/update_doctor.component';
import { AddHospitalComponent } from './hospital/addHospital/add_hospital.component';
import { UpdateHospitalComponent } from './hospital/updateHospital/update_hospital.component';
import { AddAppointmentComponent } from './appointment/addApointment/add_appointment.component';
import { HttpClientModule } from '@angular/common/http';
import { ReviewsComponent } from './reviews/reviews.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomeComponent,
    DoctorComponent,
    HospitalComponent,
    AppointmentComponent,
    PatientComponent,
    AddDoctorComponent,
    UpdateDoctorComponent,
    AddHospitalComponent,
    UpdateHospitalComponent,
    AddAppointmentComponent,
    ReviewsComponent,
    UserHomeComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgFor,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
