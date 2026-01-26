import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, CourseCreateDto, CourseUpdateDto, CourseListDto } from '../models/course.model';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) {}

  // Get all courses
  getAllCourses(): Observable<CourseListDto[]> {
    return this.http.get<CourseListDto[]>(ApiConfig.ENDPOINTS.COURSES.BASE);
  }

  // Get course by ID with lessons
  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(ApiConfig.ENDPOINTS.COURSES.BY_ID(id));
  }

  // Get courses by instructor
  getCoursesByInstructor(instructorId: string): Observable<Course[]> {
    return this.http.get<Course[]>(ApiConfig.ENDPOINTS.COURSES.BY_INSTRUCTOR(instructorId));
  }

  // Search courses
  searchCourses(searchTerm: string): Observable<CourseListDto[]> {
    const params = new HttpParams().set('search', searchTerm);
    return this.http.get<CourseListDto[]>(ApiConfig.ENDPOINTS.COURSES.SEARCH, { params });
  }

  // Create course
  createCourse(course: CourseCreateDto): Observable<Course> {
    return this.http.post<Course>(ApiConfig.ENDPOINTS.COURSES.BASE, course);
  }

  // Update course
  updateCourse(id: string, course: CourseUpdateDto): Observable<Course> {
    return this.http.put<Course>(ApiConfig.ENDPOINTS.COURSES.BY_ID(id), course);
  }

  // Delete course
  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.ENDPOINTS.COURSES.BY_ID(id));
  }

  // Get course statistics
  getCourseStatistics(courseId: string): Observable<any> {
    return this.http.get(ApiConfig.ENDPOINTS.COURSES.STATISTICS(courseId));
  }

  // Get course count
  getCourseCount(): Observable<number> {
    return this.http.get<number>(`${ApiConfig.ENDPOINTS.COURSES.BASE}/count`);
  }

  // Get popular courses
  getPopularCourses(limit: number = 10): Observable<CourseListDto[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<CourseListDto[]>(`${ApiConfig.ENDPOINTS.COURSES.BASE}/popular`, { params });
  }
}