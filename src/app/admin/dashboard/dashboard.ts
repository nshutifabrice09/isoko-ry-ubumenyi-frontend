import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    activeStudents: 0
  };

  recentUsers: any[] = [];
  recentEnrollments: any[] = [];
  isLoading = true;

  constructor(
    private userService: UserService,
    private courseService: CourseService,  
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;

    // Load stats
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.stats.totalUsers = users.length;
        this.stats.activeStudents = users.filter(u => u.role === 'STUDENT').length;
        this.recentUsers = users.slice(0, 5);
      },
      error: (err) => console.error('Error loading users:', err)
    });

    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.stats.totalCourses = courses.length;
      },
      error: (err) => console.error('Error loading courses:', err)
    });

    this.enrollmentService.getAllEnrollments().subscribe({
      next: (enrollments) => {
        this.stats.totalEnrollments = enrollments.length;
        this.recentEnrollments = enrollments.slice(0, 5);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading enrollments:', err);
        this.isLoading = false;
      }
    });
  }
}