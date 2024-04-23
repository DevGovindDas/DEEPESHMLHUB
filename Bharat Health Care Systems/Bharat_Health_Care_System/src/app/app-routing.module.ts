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
import { AddHospitalComponent } from './hospital/addHospital/add_hospital.component';
import { UpdateHospitalComponent } from './hospital/updateHospital/update_hospital.component';
import { AddAppointmentComponent } from './appointment/addApointment/add_appointment.component';
import { AuthguardService } from './service/authguard.service';
import { UserHomeComponent } from './user-home/user-home.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const configuredRoutes: Routes = [
  { path: '',
    component: LoginPageComponent },
  { 
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'userHome',
    component: UserHomeComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'reviews',
    component: ReviewsComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'doctor',
    component: DoctorComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'appointment',
    component: AppointmentComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'addAppointment',
    component: AddAppointmentComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'patient',
    component: PatientComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'hospital',
    component: HospitalComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'addDoctor',
    component: AddDoctorComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'updateDoctor',
    component: UpdateDoctorComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'addHospital',
    component: AddHospitalComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'updateHospital',
    component: UpdateHospitalComponent,
    canActivate: [AuthguardService],
  },
  { path: '**', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(configuredRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
