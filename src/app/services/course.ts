import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'})
export class Course {
  private apiUrl = '${environment.apiUrl}/course/list';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCourseById(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}`);
  }

  getCoursesByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${category}`);
  }

  enrollInCourse(courseId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId });
  }

  getUserCourses(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  createCourse(courseData: any): Observable<any> {
    return this.http.post(this.apiUrl, courseData);
  }

  updateCourse(courseId: number, courseData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}`, courseData);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`);
  }
  
}
