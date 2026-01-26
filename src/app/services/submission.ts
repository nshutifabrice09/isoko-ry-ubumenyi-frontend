import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Submission, SubmissionCreateDto, SubmissionUpdateDto } from '../models/submission.model';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  constructor(private http: HttpClient) {}

  // Get all submissions
  getAllSubmissions(): Observable<Submission[]> {
    return this.http.get<Submission[]>(ApiConfig.ENDPOINTS.SUBMISSIONS.BASE);
  }

  // Get submission by ID
  getSubmissionById(id: string): Observable<Submission> {
    return this.http.get<Submission>(ApiConfig.ENDPOINTS.SUBMISSIONS.BY_ID(id));
  }

  // Get submissions by assignment
  getSubmissionsByAssignment(assignmentId: string): Observable<Submission[]> {
    return this.http.get<Submission[]>(ApiConfig.ENDPOINTS.SUBMISSIONS.BY_ASSIGNMENT(assignmentId));
  }

  // Get submissions by student
  getSubmissionsByStudent(studentId: string): Observable<Submission[]> {
    return this.http.get<Submission[]>(ApiConfig.ENDPOINTS.SUBMISSIONS.BY_STUDENT(studentId));
  }

  // Get student's submission for an assignment
  getStudentSubmission(studentId: string, assignmentId: string): Observable<Submission> {
    return this.http.get<Submission>(ApiConfig.ENDPOINTS.SUBMISSIONS.STUDENT_ASSIGNMENT(studentId, assignmentId));
  }

  // Create submission
  createSubmission(submission: SubmissionCreateDto): Observable<Submission> {
    return this.http.post<Submission>(ApiConfig.ENDPOINTS.SUBMISSIONS.BASE, submission);
  }

  // Upload submission file
  uploadSubmissionFile(studentId: string, assignmentId: string, file: File): Observable<Submission> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('studentId', studentId);
    formData.append('assignmentId', assignmentId);
    return this.http.post<Submission>(ApiConfig.ENDPOINTS.SUBMISSIONS.UPLOAD, formData);
  }

  // Grade submission
  gradeSubmission(id: string, grade: number): Observable<Submission> {
    return this.http.put<Submission>(ApiConfig.ENDPOINTS.SUBMISSIONS.GRADE(id), { grade });
  }

  // Update submission
  updateSubmission(id: string, submission: SubmissionUpdateDto): Observable<Submission> {
    return this.http.put<Submission>(ApiConfig.ENDPOINTS.SUBMISSIONS.BY_ID(id), submission);
  }

  // Delete submission
  deleteSubmission(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.ENDPOINTS.SUBMISSIONS.BY_ID(id));
  }

  // Get ungraded submissions for instructor
  getUngradedSubmissions(instructorId: string): Observable<Submission[]> {
    return this.http.get<Submission[]>(ApiConfig.ENDPOINTS.SUBMISSIONS.UNGRADED(instructorId));
  }

  // Get submission statistics
  getSubmissionStats(assignmentId: string): Observable<any> {
    return this.http.get<any>(`${ApiConfig.ENDPOINTS.SUBMISSIONS.BY_ASSIGNMENT(assignmentId)}/stats`);
  }
}