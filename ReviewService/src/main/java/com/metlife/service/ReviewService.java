package com.metlife.service;

import com.metlife.dto.ReviewDTO;
import com.metlife.entity.Review;
import com.metlife.exceptions.ReviewNotFoundException;

import java.util.List;

public interface ReviewService {
    public List<ReviewDTO> getAllReviews();

    public ReviewDTO getReview(String id) throws ReviewNotFoundException;
    public ReviewDTO addReview(Review review);
    public ReviewDTO updateReview(Review review) throws ReviewNotFoundException;
    public void deleteReview(String id) throws ReviewNotFoundException;

}
