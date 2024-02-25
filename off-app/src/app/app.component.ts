import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  template: `
  <app-home></app-home><section>
  <form>
    <input type="text" placeholder="Filter by city"/>
    <button class="primary" type="button">Search</button>
    </form>
    </section>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'off-app';
}
