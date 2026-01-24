import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-isoko-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './isoko-landing-page.html',
  styleUrls: ['./isoko-landing-page.css']
})
export class IsokoLandingPageComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  scrolled = false;
  currentImageIndex = 0;
  private imageRotationInterval: any; // ✅ Store interval ID

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  // Hero images - African students
  heroImages = [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop', // African children in classroom
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop', // African students studying together
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop', // African kids with laptops
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop', // Students collaborating
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop'  // Students outdoor learning
  ];

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
    'Mathematics', 'Science', 'Kinyarwanda', 'English', 'Social Studies', 'Sports & PE'
  ];

  ngOnInit() {
    // Auto-rotate images every 5 seconds - SAVE the interval ID
    this.imageRotationInterval = setInterval(() => {
      this.nextImage();
    }, 5000);
  }

  ngOnDestroy() {
    // ✅ CRITICAL: Clear the interval when component is destroyed
    if (this.imageRotationInterval) {
      clearInterval(this.imageRotationInterval);
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.heroImages.length;
  }

  previousImage() {
    this.currentImageIndex = this.currentImageIndex === 0 
      ? this.heroImages.length - 1 
      : this.currentImageIndex - 1;
  }
}