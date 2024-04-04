import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { HomeComponent } from "./home/home.component";
import { DoctorComponent } from "./doctor/doctor.component";
import { AppointmentComponent } from "./appointment/appointment.component";
import { PatientComponent } from "./patient/patient.component";
import { HospitalComponent } from "./hospital/hospital.component";
import { AddDoctorComponent } from "./doctor/addDoctor/add_doctor.component";
import { UpdateDoctorComponent } from "./doctor/updateDoctor/update_doctor.component";

const configuredRoutes:Routes=[
    {path:'',component:LoginPageComponent},
    {path:'home',component:HomeComponent},
    {path:'doctor',component:DoctorComponent},
    {path:'appointment',component:AppointmentComponent},
    {path:'patient',component:PatientComponent},
    {path:'hospital',component:HospitalComponent},
    {path:'addDoctor',component:AddDoctorComponent},
    {path:'updateDoctor',component:UpdateDoctorComponent},
    {path:'**',component:LoginPageComponent},
]



@NgModule({
    imports:[RouterModule.forRoot(configuredRoutes)],
    exports:[RouterModule]
}) export class AppRoutingModule{}