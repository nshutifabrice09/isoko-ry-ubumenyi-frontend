import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment, EnrollmentCreateDto, EnrollmentUpdateDto } from '../models/enrollment.model';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = `${ApiConfig.apiUrl}/enrollments`;

  constructor(private http: HttpClient) {}

  // 1. Get all enrollments (Admin only)
  getAllEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  // 2. Get specific enrollment by ID
  getEnrollmentById(id: string): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.apiUrl}/${id}`);
  }

  // 3. Get all enrollments for a specific user (their enrolled courses)
  getEnrollmentsByUser(userId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/user/${userId}`);
  }

  // 4. Get all students enrolled in a specific course
  getEnrollmentsByCourse(courseId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/course/${courseId}`);
  }

  // 5. Check if a user is already enrolled in a course
  isUserEnrolled(userId: string, courseId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check/${userId}/${courseId}`);
  }

  // 6. Enroll a user in a course
  enrollUser(enrollment: EnrollmentCreateDto): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, enrollment);
  }

  // 7. Update enrollment progress (when student completes lessons)
  updateEnrollmentProgress(id: string, progress: number): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/${id}/progress`, { progress });
  }

  // 8. Update entire enrollment
  updateEnrollment(id: string, enrollment: EnrollmentUpdateDto): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/${id}`, enrollment);
  }

  // 9. Unenroll a user from a course (delete enrollment)
  unenrollUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 10. Get current logged-in user's enrollments
  getCurrentUserEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/my-courses`);
  }
}