package com.metlife.service;

import com.metlife.dto.ReviewDTO;
import com.metlife.entity.Review;
import com.metlife.exceptions.ReviewNotFoundException;
import com.metlife.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ReviewServiceImpl implements ReviewService{
    @Autowired
    private ReviewRepository reviewRepository;

    public List<ReviewDTO> getAllReviews(){
        return reviewRepository.findAll().stream().map(ReviewDTO::new).toList();
    }

    public ReviewDTO getReview(String id) throws ReviewNotFoundException {
        return new ReviewDTO(reviewRepository.findByReviewId(id).orElseThrow(()->new ReviewNotFoundException("PatientDoes not exist")));
    }
    public ReviewDTO addReview(Review review){
        return new ReviewDTO(reviewRepository.save(review));
    }

    public ReviewDTO updateReview(Review review) throws ReviewNotFoundException {
        Review review1=reviewRepository.findByReviewId(review.getReviewId()).orElseThrow(()->new ReviewNotFoundException("Review does not exist"));
        review1.setName(review1.getName());
        review1.setReview(review.getReview());
        reviewRepository.save(review1);
        return new ReviewDTO(review1);
    }
    public void deleteReview(String id) throws ReviewNotFoundException {
        Review review=reviewRepository.findByReviewId(id).orElseThrow(()->new ReviewNotFoundException("Review does not exist"));
        reviewRepository.deleteById(review.getId());
    }

}
