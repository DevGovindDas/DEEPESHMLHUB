package com.metlife.dto;

import com.metlife.entity.Review;
import lombok.Data;

@Data
public class ReviewDTO {
    private String reviewId;
    private String name;
    private String review;
    public ReviewDTO(Review review){
        reviewId=review.getReviewId();
        name=review.getName();
        this.review= review.getReview();
    }

}
