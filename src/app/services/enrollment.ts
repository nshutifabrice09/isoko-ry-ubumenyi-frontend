import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment, EnrollmentCreateDto, EnrollmentUpdateDto } from '../models/enrollment.model';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  constructor(private http: HttpClient) {}

  // Get all enrollments
  getAllEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(ApiConfig.ENDPOINTS.ENROLLMENTS.BASE);
  }

  // Get enrollment by ID
  getEnrollmentById(id: string): Observable<Enrollment> {
    return this.http.get<Enrollment>(ApiConfig.ENDPOINTS.ENROLLMENTS.BY_ID(id));
  }

  // Get enrollments by user
  getEnrollmentsByUser(userId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(ApiConfig.ENDPOINTS.ENROLLMENTS.BY_USER(userId));
  }

  // Get enrollments by course
  getEnrollmentsByCourse(courseId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(ApiConfig.ENDPOINTS.ENROLLMENTS.BY_COURSE(courseId));
  }

  // Check if user is enrolled in course
  isUserEnrolled(userId: string, courseId: string): Observable<boolean> {
    return this.http.get<boolean>(ApiConfig.ENDPOINTS.ENROLLMENTS.CHECK(userId, courseId));
  }

  // Enroll user in course
  enrollUser(enrollment: EnrollmentCreateDto): Observable<Enrollment> {
    return this.http.post<Enrollment>(ApiConfig.ENDPOINTS.ENROLLMENTS.BASE, enrollment);
  }

  // Update enrollment progress
  updateEnrollmentProgress(id: string, progress: number): Observable<Enrollment> {
    return this.http.put<Enrollment>(ApiConfig.ENDPOINTS.ENROLLMENTS.PROGRESS(id), { progress });
  }

  // Update enrollment
  updateEnrollment(id: string, enrollment: EnrollmentUpdateDto): Observable<Enrollment> {
    return this.http.put<Enrollment>(ApiConfig.ENDPOINTS.ENROLLMENTS.BY_ID(id), enrollment);
  }

  // Unenroll user from course
  unenrollUser(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.ENDPOINTS.ENROLLMENTS.BY_ID(id));
  }

  // Get current user's enrollments
  getCurrentUserEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(ApiConfig.ENDPOINTS.ENROLLMENTS.MY_COURSES);
  }
}