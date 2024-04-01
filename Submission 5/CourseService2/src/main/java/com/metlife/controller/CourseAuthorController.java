package com.metlife.controller;

import com.metlife.entity.Author;
import com.metlife.entity.Course;
import com.metlife.entity.CourseAuthor;
import com.metlife.exception.AuthorNotFoundException;
import com.metlife.exception.CourseNotFoundException;
import com.metlife.proxy.AuthorDetailsProxy;
import com.metlife.repository.AuthorRepository;
import com.metlife.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class CourseAuthorController {

    @Autowired
    AuthorDetailsProxy proxy;
    @Autowired
    CourseRepository courseRepository;

    @Autowired
    AuthorRepository authorRepository;
    @GetMapping("course_details/{courseId}")
    public ResponseEntity<CourseAuthor> getGrade(@PathVariable Integer courseId) throws CourseNotFoundException {
        Optional<Course> course=courseRepository.findById(courseId);
        if(course.isPresent()){
            Author I1=proxy.getAuthor(course.get().getAuthorId());
            CourseAuthor courseAuthor=new CourseAuthor();
            courseAuthor.setCourseId(course.get().getCourseId());
            courseAuthor.setCourseName(course.get().getCourseName());
            courseAuthor.setAuthor(I1);
            courseAuthor.setAvaliblity(course.get().isAvaliblity());
            courseAuthor.setDuration(course.get().getDuration());
            return new ResponseEntity<>(courseAuthor, HttpStatus.FOUND);
        }else {
            throw new CourseNotFoundException("course with id "+courseId+" does not exist");
        }
    }
    @GetMapping("course/{courseId}")
    public Course getCourse(@PathVariable Integer courseId) throws CourseNotFoundException {
        Optional<Course> course=courseRepository.findById(courseId);
        if(course.isPresent()){
            return course.get();
        }else {
            throw new CourseNotFoundException("course with id "+courseId+" does not exist");
        }
    }
    @GetMapping("course_details")
    public List<CourseAuthor> getGrade() throws CourseNotFoundException {
        List<Course> courses=courseRepository.findAll();
        List<CourseAuthor> courseAuthors=new ArrayList<>();
        for(Course course:courses){
                Author I1=proxy.getAuthor(course.getAuthorId());
                CourseAuthor courseAuthor=new CourseAuthor();
                courseAuthor.setCourseId(course.getCourseId());
                courseAuthor.setCourseName(course.getCourseName());
                courseAuthor.setAuthor(I1);
                courseAuthor.setAvaliblity(course.isAvaliblity());
                courseAuthor.setDuration(course.getDuration());
                courseAuthors.add(courseAuthor);
        }
        return courseAuthors;
    }

    @PostMapping("course_details")
    public Course addCourse(@RequestBody Course course) throws AuthorNotFoundException {
        Optional<Author> author=authorRepository.findById(course.getAuthorId());
        if(author.isPresent()){
            Course course1=new Course();
            course1.setAvaliblity(course.isAvaliblity());
            course1.setCourseName(course.getCourseName());
            course1.setAuthorId(course.getAuthorId());
            course1.setDuration(course.getDuration());
            course1=courseRepository.save(course1);
            return course1;
        }else {
            throw new AuthorNotFoundException("Author with id "+course.getAuthorId()+" does not exist");
        }
    }

    @DeleteMapping("course_details/{id}")
    public Course deleteCourse(@PathVariable int id) throws CourseNotFoundException {
        Optional<Course> course =courseRepository.findById(id);
        if(course.isPresent()){
            courseRepository.deleteById(id);
        }else{
            throw new CourseNotFoundException("Course with id "+id+" does not exist");
        }
        return course.get();
    }

    @PutMapping("course_details")
    public Course updateCourse(@RequestBody Course course) throws AuthorNotFoundException, CourseNotFoundException {
        Optional<Author> author=authorRepository.findById(course.getAuthorId());
        Optional<Course> course2=courseRepository.findById(course.getCourseId());
        if(author.isPresent()&&course2.isPresent()){
            Course course1=new Course();
            course1.setCourseId(course.getCourseId());
            course1.setAvaliblity(course.isAvaliblity());
            course1.setCourseName(course.getCourseName());
            course1.setAuthorId(course.getAuthorId());
            course1.setDuration(course.getDuration());
            course1=courseRepository.save(course1);
            return course1;
        }else if(author.isEmpty()) {
            throw new AuthorNotFoundException("Author with id "+course.getAuthorId()+" does not exist");
        }else {
            throw new CourseNotFoundException("Course with id "+course.getCourseId()+" does not exist");
        }
    }

}
