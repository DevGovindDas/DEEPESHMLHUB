package com.metlife.repository;

import com.metlife.model.Course;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class CourseRepository {
    private List<Course> courses=new ArrayList<>();
    {
        courses.add(new Course("JavaScript Basics","Programming",100,true));
        courses.add(new Course("Advanced Python","Programming",200,false));
        courses.add(new Course("UI/UX Design Fundamentals","Design",150,true));
        courses.add(new Course("Advanced Graphic Design","Design",120,false));
    }

    public List<Course> getCourses(){
        return courses;
    }
    public Course addCourse(Course course){
        courses.add(course);
        return courses.get(courses.size()-1);
    }

    public void deleteCourseById(int id){
        courses=courses.stream().filter((course)->course.getId()!=id).collect(Collectors.toList());
    }

    public Course updateCourse(Course course){
        courses=courses.stream().map((course1)->course1.getId()==course.getId()?course:course1).collect(Collectors.toList());
        return course;
    }

    public Course findCourseById(int id){
        Optional<Course> course=courses.stream().filter((course1)->course1.getId()==id).findAny();
        return course.orElse(null);
    }
}
