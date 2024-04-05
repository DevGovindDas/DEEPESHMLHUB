import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgFor,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
