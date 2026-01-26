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

  // 1. Get all enrollments (Admin only)
  getAllEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(ApiConfig.ENDPOINTS.ENROLLMENTS.BASE);
  }

  // 2. Get specific enrollment by ID
  getEnrollmentById(id: string): Observable<Enrollment> {
    return this.http.get<Enrollment>(ApiConfig.ENDPOINTS.ENROLLMENTS.BY_ID(id));
  }

  // 3. Get all enrollments for a specific user (their enrolled courses)
  getEnrollmentsByUser(userId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(ApiConfig.ENDPOINTS.ENROLLMENTS.BY_USER(userId));
  }

  // 4. Get all students enrolled in a specific course
  getEnrollmentsByCourse(courseId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(ApiConfig.ENDPOINTS.ENROLLMENTS.BY_COURSE(courseId));
  }

  // 5. Check if a user is already enrolled in a course
  isUserEnrolled(userId: string, courseId: string): Observable<boolean> {
    return this.http.get<boolean>(ApiConfig.ENDPOINTS.ENROLLMENTS.CHECK(userId, courseId));
  }

  // 6. Enroll a user in a course
  enrollUser(enrollment: EnrollmentCreateDto): Observable<Enrollment> {
    return this.http.post<Enrollment>(ApiConfig.ENDPOINTS.ENROLLMENTS.BASE, enrollment);
  }

  // 7. Update enrollment progress (when student completes lessons)
  updateEnrollmentProgress(id: string, progress: number): Observable<Enrollment> {
    return this.http.put<Enrollment>(ApiConfig.ENDPOINTS.ENROLLMENTS.PROGRESS(id), { progress });
  }

  // 8. Update entire enrollment
  updateEnrollment(id: string, enrollment: EnrollmentUpdateDto): Observable<Enrollment> {
    return this.http.put<Enrollment>(ApiConfig.ENDPOINTS.ENROLLMENTS.BY_ID(id), enrollment);
  }

  // 9. Unenroll a user from a course (delete enrollment)
  unenrollUser(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.ENDPOINTS.ENROLLMENTS.BY_ID(id));
  }

  // 10. Get current logged-in user's enrollments
  getCurrentUserEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(ApiConfig.ENDPOINTS.ENROLLMENTS.MY_COURSES);
  }

  // 11. Get enrollment statistics (bonus method)
  getEnrollmentStats(): Observable<any> {
    return this.http.get<any>(`${ApiConfig.ENDPOINTS.ENROLLMENTS.BASE}/stats`);
  }

  // 12. Get completed enrollments for a user
  getCompletedEnrollments(userId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${ApiConfig.ENDPOINTS.ENROLLMENTS.BY_USER(userId)}/completed`);
  }

  // 13. Get in-progress enrollments for a user
  getInProgressEnrollments(userId: string): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${ApiConfig.ENDPOINTS.ENROLLMENTS.BY_USER(userId)}/in-progress`);
  }

  // 14. Bulk enroll users
  bulkEnrollUsers(enrollments: EnrollmentCreateDto[]): Observable<Enrollment[]> {
    return this.http.post<Enrollment[]>(`${ApiConfig.ENDPOINTS.ENROLLMENTS.BASE}/bulk`, enrollments);
  }

  // 15. Get enrollment count by course
  getEnrollmentCountByCourse(courseId: string): Observable<number> {
    return this.http.get<number>(`${ApiConfig.ENDPOINTS.ENROLLMENTS.BY_COURSE(courseId)}/count`);
  }
}