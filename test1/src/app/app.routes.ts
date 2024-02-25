import { Routes } from '@angular/router';
import { GovernanceComponent } from './governance/governance.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { FinanceComponent } from './finance/finance.component';
import { HRComponent } from './hr/hr.component';
import { ITComponent } from './it/it.component';
import { MigrationsComponent } from './migrations/migrations.component';
import { QualityComponent } from './quality/quality.component';
import { FavouriteComponent } from './favourite/favourite.component';

export const routes: Routes = [
    {
        path:"",component:FacilitiesComponent
    },
    {
        path:"governance",component:GovernanceComponent
    },
    {
        path:"facilities",component:FacilitiesComponent
    },
    {
        path:"finance",component:FinanceComponent
    },
    {
        path:"hr",component:HRComponent
    },
    {
        path:"it",component:ITComponent
    },
    {
        path:"migrations",component:MigrationsComponent
    },
    {
        path:"quality",component:QualityComponent
    },
    {
        path:"favourite",component:FavouriteComponent
    },
    
];
