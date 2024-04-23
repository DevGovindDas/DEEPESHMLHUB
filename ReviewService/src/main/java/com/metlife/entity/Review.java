package com.metlife.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column
    private String reviewId;

    @Column
    private String name;

    @Column
    private String review;


    @PrePersist
    public void generateReviewId(){
        this.reviewId= "R"+String.format("%05d", this.id);
    }
}
