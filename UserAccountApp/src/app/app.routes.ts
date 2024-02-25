import { Routes } from '@angular/router';
import { BookDisplayComponent } from './book-display/book-display.component';
import { BulbToggleThemeChangerComponent } from './bulb-toggle-theme-changer/bulb-toggle-theme-changer.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserAccountComponent } from './user-account/user-account.component';

export const routes: Routes = [
    {
        path:'book_display', component:BookDisplayComponent
    },
    {
        path:'bulb_theme_demo', component:BulbToggleThemeChangerComponent
    },
    {
        path:'user_form', component:UserFormComponent
    },
    {
        path:'user_account', component:UserAccountComponent
    }
];
