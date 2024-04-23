import { Component, OnInit, inject } from '@angular/core';
import { Review } from 'src/model/BHCS.model';
import { ReviewService } from '../service/services';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  reviewService: ReviewService = inject(ReviewService);
  constructor() {
    this.reviewService.getAllreviews().subscribe(data=>this.reviews=data);
  }

  ngOnInit(): void {}
}
