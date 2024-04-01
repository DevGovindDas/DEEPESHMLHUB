package com.metlife.entity;

import com.metlife.proxy.AuthorDetailsProxy;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

@Data
public class CourseAuthor {

    private int courseId;

    private String courseName;

    private int duration;

    private boolean avaliblity;

    private Author author;
}
