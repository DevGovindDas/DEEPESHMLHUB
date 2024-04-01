package com.metlife.entity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int courseId;
    @Column
    private String courseName;
    @Column
    private int duration;
    @Column
    private boolean avaliblity;
    @Column
    private int authorId;

}
