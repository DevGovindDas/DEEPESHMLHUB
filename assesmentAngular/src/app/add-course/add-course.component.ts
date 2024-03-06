import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseSbService } from '../service/course-sb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: '../add-course/add-course.component.html',
  styleUrls: ['../add-course/add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  [x: string]: any;
  addForm? : FormGroup;
  constructor(private formBuilder: FormBuilder,
   private courseService: CourseSbService, private router:Router) {

  }
  ngOnInit(): void {
   this.addForm = this.formBuilder.group({
    courseId : ['1',[Validators.required]],
    courseName:['a',[Validators.required]],
    authorName:['b',[Validators.required]],
    duration:['5',[Validators.required, Validators.min(5),Validators.max(50)]]
   });
  }
 saveCourse() {
  console.log('Employee details sent to server..');
  console.log(this.addForm.value);
   this.courseService.createCourse(this.addForm.value)
   .subscribe((data) => {
    console.log('data saved ', data)
   })
   this.router.navigate(['courses-sb']);
 }
}
