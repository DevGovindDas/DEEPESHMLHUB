package com.metlife.controller;

import java.util.List;
import java.util.Optional;

import com.metlife.entity.Course;
import com.metlife.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class CourseController {
// Dependency Injection (spring framework creates the Repository internally and injects the instance into your app
	@Autowired
	private CourseRepository courseRepository;

	@GetMapping("/courses")
	public List getCourseList() {
		List<Course> courseList = courseRepository.findAll();
		return courseList;
	}

	@GetMapping("/courses/{id}")
	public Course getCourseById(@PathVariable(value = "id") Integer id) {
		Course existingCourse = courseRepository.findById(id).get();
		return existingCourse;
	}

	@PostMapping("/courses")
	public Course createCourse(@RequestBody Course Course) {
		Course savedCourse = courseRepository.save(Course);
		return savedCourse;
	}

	@PutMapping("/courses/{id}")
	public Course updateCourse(@PathVariable(value = "id") Integer id, @RequestBody Course course) {
		// fetch the Course
		Course existingCourse = null;
		Optional<Course> optionalCourse = courseRepository.findById(id);
		if (optionalCourse.isPresent()) {
			existingCourse = optionalCourse.get();
			existingCourse.setCourseName(course.getCourseName());
			existingCourse.setAuthorName(course.getAuthorName());
			existingCourse.setDuration(course.getDuration());
			existingCourse = courseRepository.save(existingCourse);
		}
		return existingCourse;
	}

	@DeleteMapping("/courses/{id}")
	public Course deleteCourseById(@PathVariable(value = "id") Integer id) {
		Course existingCourse = courseRepository.findById(id).get();
		courseRepository.delete(existingCourse);
		return existingCourse;
	}
//	@DeleteMapping("/Courses/{id}")
//	public Map<String,Boolean> deleteEmployeeById(@PathVariable(value="id") Integer id) {
//		Employee existingEmployee = employeeRepository.findById(id).get();
//	    employeeRepository.delete(existingEmployee);
//	    Map<String, Boolean> response = new HashMap<>();
//	    response.put("deleted", Boolean.TRUE);
//		return response;
//	}
}
