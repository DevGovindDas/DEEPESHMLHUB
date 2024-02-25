import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAccountComponent } from './user-account/user-account.component';
import { BulbToggleThemeChangerComponent } from './bulb-toggle-theme-changer/bulb-toggle-theme-changer.component';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { BookDisplayComponent } from './book-display/book-display.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,UserAccountComponent,BulbToggleThemeChangerComponent,CommonModule,UserFormComponent,BookDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UserAccountApp';
}
