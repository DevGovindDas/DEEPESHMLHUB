package com.metlife.controller;

import com.metlife.dto.ReviewDTO;
import com.metlife.entity.Review;
import com.metlife.exceptions.ReviewNotFoundException;
import com.metlife.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("review")
@CrossOrigin(origins = "http://localhost:4200")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @GetMapping
    public List<ReviewDTO> getAllReviews(){
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public ReviewDTO getReview(@PathVariable String id) throws ReviewNotFoundException {
        return reviewService.getReview(id);
    }

    @PostMapping
    public ReviewDTO addReview(@RequestBody Review review){
        return reviewService.addReview(review);
    }

    @PutMapping
    public ReviewDTO updateReview(@RequestBody Review review) throws ReviewNotFoundException {

        return reviewService.updateReview(review);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable String id) throws ReviewNotFoundException {
       reviewService.deleteReview(id);
    }

}
