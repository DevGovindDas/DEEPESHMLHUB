import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, Course1 } from '../model/course.model';
import { CourseSbService } from '../service/course-sb.service';


@Component({
  selector: 'app-update-course-sb',
  templateUrl: './update-course-sb.component.html',
  styleUrls: ['./update-course-sb.component.css']
})
export class UpdateCourseComponent implements OnInit {
  id:number;
  course: Course1;
  constructor(private courseSbService: CourseSbService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.id = 5;
    this.id = this.route.snapshot.params['id'];
    console.log(this.id+" is recieved");
    this.course = new Course1();
    this.courseSbService.getCourseById(this.id)
    .subscribe(searchedCourse => {
      console.log(searchedCourse)
      this.course = searchedCourse;
    }, error => console.log(error+ "Is A Serious Error"))
  }
  updateEmployee() {
    this.courseSbService.updateCourse(this.course)
    .subscribe(data => console.log(data), error => console.log(error));
    this.course = new Course();
    this.router.navigate(['/courses-sb']);
  }
}


