import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, Course1 } from '../model/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseSbService {
  baseUrl: string = "http://localhost:8080/api/v1/courses";
  course:Course[]=[];
  constructor(private httpClient: HttpClient) {
  }
  getCourses():Observable<Course[]>{
    // get
    return this.httpClient.get<Course[]>("http://localhost:8088/course_details");
  }
  getCourseById(id: number):Observable<Course1> {
    //get
    return this.httpClient.get<Course1>("http://localhost:8088/course" + "/" + id);
  }
  createCourse(course: Course1):Observable<any> {
    //post : new emp
    console.log(course)
    return this.httpClient.post("http://localhost:8088/course_details", course);
  }
  updateCourse(course:Course1) : Observable<Object> {
    //put : update emp
    return this.httpClient.put("http://localhost:8088/course_details", course);
  }
  deleteCourse(id: number):Observable<Course> {
    //post
    return this.httpClient.delete<Course>("http://localhost:8088/course_details" + "/" + id);
  }
}
