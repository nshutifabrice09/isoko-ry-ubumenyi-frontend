import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class AdminLayoutComponent implements OnInit {
  isSidebarOpen = true;
  currentUser: any;
  
  menuItems = [
    { icon: 'speedometer2', label: 'Dashboard', route: '/admin/dashboard' },
    { icon: 'people', label: 'Users', route: '/admin/users' },
    { icon: 'book', label: 'Courses', route: '/admin/courses' },
    { icon: 'person-check', label: 'Enrollments', route: '/admin/enrollments' },
    { icon: 'file-text', label: 'Assignments', route: '/admin/assignments' },
    { icon: 'inbox', label: 'Submissions', route: '/admin/submissions' },
    { icon: 'bar-chart', label: 'Analytics', route: '/admin/analytics' },
    { icon: 'gear', label: 'Settings', route: '/admin/settings' }
  ];

  constructor(
    private Auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.Auth.currentUserValue;
    
    // Check if user is admin
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') {
      this.router.navigate(['/login']);
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.Auth.logout();
    this.router.navigate(['/login']);
  }
}