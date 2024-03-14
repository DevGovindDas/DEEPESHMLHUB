import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { P4pComponent } from './p4p/p4p.component';
import { P4pPaidDetailsComponent } from './P4p-paid_details/P4p-paid_details.component';


export const routes: Routes = [
    {
        path:"",component:LandingPageComponent
    },
    {
        path:"#",component:LandingPageComponent
    },
    {
        path:"p4p",component:P4pComponent
    },
    {
        path:"p4pPaidD",component:P4pPaidDetailsComponent
    },
];
