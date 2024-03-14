import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course.model';

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
    return this.httpClient.get<Course[]>(this.baseUrl);
  }
  getCourseById(id: number):Observable<Course> {
    //get
    return this.httpClient.get<Course>(this.baseUrl + "/" + id);;
  }
  createCourse(course: Course):Observable<any> {
    //post : new emp
    return this.httpClient.post(this.baseUrl, course);
  }
  updateCourse(id:number, course:Course) : Observable<Object> {
    //put : update emp
    return this.httpClient.put(`${this.baseUrl}/${id}`, course);
  }
  deleteCourse(id: number):Observable<Course> {
    //post
    return this.httpClient.delete<Course>(this.baseUrl + "/" + id);
  }
}
