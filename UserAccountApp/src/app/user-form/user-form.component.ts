import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './user-form.component.html',
  styleUrls: [ './../bootstrap.css','./user-form.component.css']
})
export class UserFormComponent {
firstName:String='';
lastName:String='';
}
