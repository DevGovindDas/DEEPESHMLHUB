import { Injectable } from '@angular/core';
import { Book } from './interfaces/userFormInterface.interface';
@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  bookCart:Book[]=[{
    bookName:'Cartoon Book for Children',
    author:"Author1",
    bookImg:'./../../assets/Book1_.jpg',
    kindlePrice:'100',
    paperbackPrice:'100'
  }];
  constructor() { }
  getAllBooks():Book[]{
    return this.bookCart;
  }
}
