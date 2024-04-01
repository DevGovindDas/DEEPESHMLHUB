import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseSbService } from '../service/course-sb.service';
import { Course } from '../model/course.model';

@Component({
  selector: 'app-list-course',
  templateUrl: '../list-course/list-course.component.html',
  styleUrls: ['../list-course/list-course.component.css',]
})
//life-cycle hooks (initialization)
export class ListCourseComponent implements OnInit {
  courses?: Course[];
  courseService: CourseSbService;
  // instantiates the employee service
  constructor(courseService: CourseSbService, private router:Router) {
    this.courseService = courseService;
  }
 
  // populates the data into the employees array.
  ngOnInit(): void {
    //inintialize
    this.courseService.getCourses().subscribe(
      (courseData:Course[]) => { this.courses=courseData }
      
    );
    console.log("Msg1")
    console.log(this.courses);
    console.log("Msg2");
  }
  deleteCourse(toDeleteCourse : Course) : void {
    this.courseService.deleteCourse(toDeleteCourse.courseId).subscribe(
      (data)=> {
        console.log(data)
        // remove from array
        this.courses = this.courses.filter((course) => course != toDeleteCourse )
      }
    )
  }
  updateCourse(id? :number) {
    console.log(id);
    //navigate to update emp comp
    this.router.navigate(['update',id]);
  }
}
