import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PatientComponent } from './patient/patient.component';
import { HospitalComponent } from './hospital/hospital.component';
import { AddDoctorComponent } from './doctor/addDoctor/add_doctor.component';
import { UpdateDoctorComponent } from './doctor/updateDoctor/update_doctor.component';
import { AdminAuthguardService } from './service/authguard.service';
import { AddHospitalComponent } from './hospital/addHospital/add_hospital.component';
import { UpdateHospitalComponent } from './hospital/updateHospital/update_hospital.component';

const configuredRoutes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AdminAuthguardService],
  },
  {
    path: 'doctor',
    component: DoctorComponent,
    canActivate: [AdminAuthguardService],
  },
  {
    path: 'appointment',
    component: AppointmentComponent,
    canActivate: [AdminAuthguardService],
  },
  {
    path: 'patient',
    component: PatientComponent,
    canActivate: [AdminAuthguardService],
  },
  {
    path: 'hospital',
    component: HospitalComponent,
    canActivate: [AdminAuthguardService],
  },
  {
    path: 'addDoctor',
    component: AddDoctorComponent,
    canActivate: [AdminAuthguardService],
  },
  {
    path: 'updateDoctor',
    component: UpdateDoctorComponent,
    canActivate: [AdminAuthguardService],
  },
  {
    path: 'addHospital',
    component: AddHospitalComponent,
    canActivate: [AdminAuthguardService],
  },
  {
    path: 'updateHospital',
    component: UpdateHospitalComponent,
    canActivate: [AdminAuthguardService],
  },
  { path: '**', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(configuredRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
