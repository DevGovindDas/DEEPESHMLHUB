import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseSbService } from '../service/course-sb.service';
import { Router } from '@angular/router';
import { Course, Course1 } from '../model/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: '../add-course/add-course.component.html',
  styleUrls: ['../add-course/add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  [x: string]: any;
  addForm? : FormGroup;
  courseNew:Course1={
    courseId:0,courseName: " ",duration:0,authorId:1,avaliblity:true,
  };
  constructor(private formBuilder: FormBuilder,
   private courseService: CourseSbService, private router:Router) {

  }
  ngOnInit(): void {
   this.addForm = this.formBuilder.group({
    courseId : ['1',[Validators.required]],
    courseName:['a',[Validators.required]],
    authorId:['52',[Validators.required]],
    duration:['5',[Validators.required,]],
    avaliblity:['true',[Validators.required]]
   });
  }
 saveCourse() {
  console.log('Employee details sent to server..');
  
  this.courseNew.avaliblity=this.addForm.value.avaliblity;
  this.courseNew.courseId=this.addForm.value.courseId;
  this.courseNew.courseName=this.addForm.value.courseName;
  this.courseNew.duration=this.addForm.value.duration;
  this.courseNew.authorId=this.addForm.value.authorId;
   this.courseService.createCourse(this.courseNew)
   .subscribe((data) => {
    console.log('data saved ', data)
   })
   this.router.navigate(['courses-sb']);
 }
}
