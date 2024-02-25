import { Component, inject } from '@angular/core';
import { Book } from '../interfaces/userFormInterface.interface';
import { BookServiceService } from '../book-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-book-display',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './book-display.component.html',
  styleUrls:['./../bootstrap.css','./book-display.component.css']
})
export class BookDisplayComponent {
  bookCartService:BookServiceService=inject(BookServiceService);
  bookCartArray:Book[]=[];
  loadCart():void{
    this.bookCartArray=this.bookCartService.getAllBooks();
  }

}
