import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Course {
  private apiUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) {}

  // Get all courses
  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get course by ID
  getCourseById(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}`);
  }

  // Get courses by category
  getCoursesByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${category}`);
  }

  // Enroll in course
  enrollInCourse(courseId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId });
  }

  // Get user's enrolled courses
  getUserCourses(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Create course (instructor only)
  createCourse(courseData: any): Observable<any> {
    return this.http.post(this.apiUrl, courseData);
  }

  // Update course
  updateCourse(courseId: number, courseData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}`, courseData);
  }

  // Delete course
  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`);
  }
  
}
