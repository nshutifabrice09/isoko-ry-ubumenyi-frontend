import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment, AssignmentCreateDto, AssignmentUpdateDto } from '../models/assignment.model';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  constructor(private http: HttpClient) {}

  // Get all assignments
  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(ApiConfig.ENDPOINTS.ASSIGNMENTS.BASE);
  }

  // Get assignment by ID
  getAssignmentById(id: string): Observable<Assignment> {
    return this.http.get<Assignment>(ApiConfig.ENDPOINTS.ASSIGNMENTS.BY_ID(id));
  }

  // Get assignments by course
  getAssignmentsByCourse(courseId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(ApiConfig.ENDPOINTS.ASSIGNMENTS.BY_COURSE(courseId));
  }

  // Get upcoming assignments
  getUpcomingAssignments(userId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(ApiConfig.ENDPOINTS.ASSIGNMENTS.UPCOMING(userId));
  }

  // Get overdue assignments
  getOverdueAssignments(userId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(ApiConfig.ENDPOINTS.ASSIGNMENTS.OVERDUE(userId));
  }

  // Create assignment
  createAssignment(assignment: AssignmentCreateDto): Observable<Assignment> {
    return this.http.post<Assignment>(ApiConfig.ENDPOINTS.ASSIGNMENTS.BASE, assignment);
  }

  // Update assignment
  updateAssignment(id: string, assignment: AssignmentUpdateDto): Observable<Assignment> {
    return this.http.put<Assignment>(ApiConfig.ENDPOINTS.ASSIGNMENTS.BY_ID(id), assignment);
  }

  // Delete assignment
  deleteAssignment(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.ENDPOINTS.ASSIGNMENTS.BY_ID(id));
  }

  // Get assignment count by course
  getAssignmentCountByCourse(courseId: string): Observable<number> {
    return this.http.get<number>(`${ApiConfig.ENDPOINTS.ASSIGNMENTS.BY_COURSE(courseId)}/count`);
  }
}