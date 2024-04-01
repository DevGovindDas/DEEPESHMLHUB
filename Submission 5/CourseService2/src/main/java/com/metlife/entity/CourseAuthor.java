package com.metlife.entity;

import lombok.Data;

@Data
public class CourseAuthor {

    private int courseId;

    private String courseName;

    private int duration;

    private boolean avaliblity;

    private Author author;
}
