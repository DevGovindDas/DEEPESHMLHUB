package com.metlife.controller;

import com.metlife.model.Course;
import com.metlife.repository.CourseRepository;

public class App {
    public static void main(String[] args) {
        CourseRepository repository=new CourseRepository();

        System.out.println("*******************All Courses Initially*******************");
        repository.getCourses().forEach(System.out::println);

        System.out.println("************Adding a new Course and displaying*********");
        repository.addCourse(new Course("name1","category1",120,true));

        repository.getCourses().forEach(System.out::println);

        System.out.println("****************Deleting course with id 5************");
        repository.deleteCourseById(5);
        repository.getCourses().forEach(System.out::println);

        System.out.println("****************Updating course with id 4************");
        Course course=repository.findCourseById(4);
        course.setName("Updated Name");
        repository.updateCourse(course);
        repository.getCourses().forEach(System.out::println);
    }
}
