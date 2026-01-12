import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-isoko-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './isoko-landing-page.html',
  styleUrls: ['./isoko-landing-page.css']
})
export class IsokoLandingPageComponent {
  isMenuOpen = false;
  scrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  stats = [
    { value: '10,000+', label: 'Students' },
    { value: '500+', label: 'Courses' },
    { value: '200+', label: 'Instructors' },
    { value: '95%', label: 'Success Rate' }
  ];

  features = [
    {
      icon: 'book',
      title: 'Quality Courses',
      description: 'Access hundreds of expertly crafted courses across various disciplines'
    },
    {
      icon: 'people',
      title: 'Expert Instructors',
      description: 'Learn from experienced educators and industry professionals'
    },
    {
      icon: 'award',
      title: 'Certificates',
      description: 'Earn recognized certificates upon course completion'
    },
    {
      icon: 'graph-up',
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics'
    }
  ];

  categories = [
    'Technology', 'Business', 'Science', 'Mathematics', 'Languages', 'Arts'
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}