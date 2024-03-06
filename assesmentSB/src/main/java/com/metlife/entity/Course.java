package com.metlife.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

// Model mapped to a row in the table. [ORM]
@Entity
// Employee > EMPLOYEES
@Table(name = "COURSE")
public class Course {
//	Uniqueness
	@Id
//	Auto gen Id
	@GeneratedValue(strategy = GenerationType.AUTO)
//	id > EMPLOYEE_ID
	@Column(name = "COURSE_ID")
	private Integer courseId;
	@Column(name = "COURSE_NAME", nullable = false)
	private String courseName;
	@Column(name="AUTHOR_NAME")
	private String authorName;
	@Column(name="DURATION")
	private int duration;

	public Course() {
	}

	public Course(Integer courseId, String courseName, String authorName, int duration) {
		this.courseId = courseId;
		this.courseName = courseName;
		this.authorName = authorName;
		this.duration = duration;
	}

	public Integer getCourseId() {
		return courseId;
	}

	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getAuthorName() {
		return authorName;
	}

	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}
}