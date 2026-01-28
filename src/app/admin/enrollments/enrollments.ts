import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseListDto } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment';
import { UserService } from '../../services/user';
import { CourseService } from '../../services/course';

import { Enrollment } from '../../models/enrollment.model';
import { User } from '../../models/user.model';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-enrollments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollments.html',
  styleUrls: ['./enrollments.css']
})
export class EnrollmentsComponent implements OnInit {

  enrollments: Enrollment[] = [];
  filteredEnrollments: Enrollment[] = [];

  users: User[] = [];
  courses: CourseListDto[] = [];

  isLoading = false;
  showAddModal = false;

  searchTerm = '';
  filterCourse = '';
  filterUser = '';

  newEnrollment: { userId: string; courseId: string } = {
    userId: '',
    courseId: ''
  };

  errors = {
    userId: '',
    courseId: '',
    general: ''
  };

  constructor(
    private enrollmentService: EnrollmentService,
    private userService: UserService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadEnrollments();
    this.loadUsers();
    this.loadCourses();
  }

  loadEnrollments(): void {
    this.isLoading = true;

    this.enrollmentService.getAllEnrollments().subscribe({
      next: (data: Enrollment[]) => {
        this.enrollments = data;
        this.filteredEnrollments = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading enrollments:', err);
        this.isLoading = false;
      }
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data.filter((u: User) => u.role === 'STUDENT');
      },
      error: (err: any) => {
        console.error('Error loading users:', err);
      }
    });
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data: CourseListDto[]) => {
        this.courses = data;
    },
      error: (err: any) => {
        console.error('Error loading courses:', err);
      }
    });
  }

  filterEnrollments(): void {
    this.filteredEnrollments = this.enrollments.filter((enrollment: Enrollment) => {
      const matchesSearch =
        enrollment.user?.fullName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        enrollment.course?.title?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCourse =
        !this.filterCourse || enrollment.course?.id === this.filterCourse;

      const matchesUser =
        !this.filterUser || enrollment.user?.id === this.filterUser;

      return matchesSearch && matchesCourse && matchesUser;
    });
  }

  openAddModal(): void {
    this.showAddModal = true;
    this.newEnrollment = { userId: '', courseId: '' };
    this.errors = { userId: '', courseId: '', general: '' };
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  validateForm(): boolean {
    let isValid = true;
    this.errors = { userId: '', courseId: '', general: '' };

    if (!this.newEnrollment.userId) {
      this.errors.userId = 'Please select a student';
      isValid = false;
    }

    if (!this.newEnrollment.courseId) {
      this.errors.courseId = 'Please select a course';
      isValid = false;
    }

    return isValid;
  }

  addEnrollment(): void {
    if (!this.validateForm()) return;

    this.isLoading = true;

    this.enrollmentService.enrollUser(this.newEnrollment).subscribe({
      next: (enrollment: Enrollment) => {
        this.enrollments.unshift(enrollment);
        this.filterEnrollments();
        this.closeAddModal();
        this.isLoading = false;
        alert('Student enrolled successfully!');
      },
      error: (err: any) => {
        console.error('Error enrolling student:', err);
        this.errors.general = err?.error?.message || 'Failed to enroll student';
        this.isLoading = false;
      }
    });
  }

  updateProgress(enrollment: Enrollment, newProgress: number): void {
    if (newProgress < 0 || newProgress > 100) {
      alert('Progress must be between 0 and 100');
      return;
    }

    this.enrollmentService
      .updateEnrollmentProgress(enrollment.id, newProgress)
      .subscribe({
        next: (updated: Enrollment) => {
          enrollment.progress = updated.progress;
          alert('Progress updated successfully!');
        },
        error: (err: any) => {
          console.error('Error updating progress:', err);
          alert('Failed to update progress');
        }
      });
  }

  deleteEnrollment(enrollment: Enrollment): void {
    if (
      !confirm(
        `Are you sure you want to unenroll ${enrollment.user?.fullName} from ${enrollment.course?.title}?`
      )
    ) {
      return;
    }

    this.enrollmentService.unenrollUser(enrollment.id).subscribe({
      next: () => {
        this.enrollments = this.enrollments.filter(
          (e: Enrollment) => e.id !== enrollment.id
        );
        this.filterEnrollments();
        alert('Student unenrolled successfully!');
      },
      error: (err: any) => {
        console.error('Error unenrolling student:', err);
        alert('Failed to unenroll student');
      }
    });
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return 'green';
    if (progress >= 50) return 'orange';
    return 'red';
  }
}
