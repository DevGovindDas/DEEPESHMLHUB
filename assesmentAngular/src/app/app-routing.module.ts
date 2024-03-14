import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "./service/auth-guard.service";
import { ListCourseComponent } from "./list-course/list-course.component";
import { UpdateCourseComponent } from "./update-course-sb/update-course-sb.component";
import { AddCourseComponent } from "./add-course/add-course.component";
import { RegisterComponent } from "./register/register.component";


const configuredRoutes : Routes = [
    // localhost:4200 (localhost:4200/employees)
    // {path : '', redirectTo: 'login', pathMatch: 'full'},
    {path: '', component:LoginComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'add', component:AddCourseComponent, canActivate:[AuthGuardService]},
    {path: 'courses-sb', component:ListCourseComponent, canActivate:[AuthGuardService]},
    {path: 'update/:id', component:UpdateCourseComponent, canActivate:[AuthGuardService]},
    {path: '**', component:LoginComponent},
    
    
]

@NgModule({
    //AppRoutingModule is using the RouterModule
    //import it / configure it
    imports: [RouterModule.forRoot(configuredRoutes)],
    // export RouterModule / used by other modules / outside AppRoutingModule
    exports: [RouterModule]
})
export class AppRoutingModule {

}