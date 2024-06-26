package com.metlife.repository;

import com.metlife.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review,Long> {
     Optional<Review> findByReviewId(String reviewId);

}
