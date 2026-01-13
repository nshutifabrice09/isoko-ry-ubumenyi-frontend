import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})


export class About {
stats = [
    { value: '10,000+', label: 'Active Students', icon: 'people' },
    { value: '500+', label: 'Quality Courses', icon: 'book' },
    { value: '200+', label: 'Expert Instructors', icon: 'award' },
    { value: '15+', label: 'Years Experience', icon: 'calendar' }
  ];

  values = [
    {
      icon: 'lightbulb',
      title: 'Innovation',
      description: 'We embrace cutting-edge technology to deliver the best learning experience'
    },
    {
      icon: 'heart',
      title: 'Student-Centered',
      description: 'Every decision we make puts our students\' success and growth first'
    },
    {
      icon: 'shield-check',
      title: 'Quality Education',
      description: 'We maintain the highest standards in curriculum and teaching methods'
    },
    {
      icon: 'people',
      title: 'Community',
      description: 'Building a supportive network of learners, educators, and mentors'
    }
  ];

  team = [
    {
      name: 'Jean Claude Mugabo',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      bio: 'Passionate about democratizing education across Rwanda'
    },
    {
      name: 'Grace Uwase',
      role: 'Chief Academic Officer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      bio: '15+ years experience in curriculum development'
    },
    {
      name: 'Patrick Ndayisaba',
      role: 'Head of Technology',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      bio: 'Building scalable and accessible learning platforms'
    },
    {
      name: 'Aline Ishimwe',
      role: 'Student Success Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
      bio: 'Dedicated to helping every student achieve their goals'
    }
  ];

  milestones = [
    { year: '2019', title: 'Founded', description: 'Isoko ry\'Ubumenyi was established with a vision' },
    { year: '2020', title: 'First 1,000 Students', description: 'Reached our first major milestone' },
    { year: '2022', title: 'REB Partnership', description: 'Official partnership with Rwanda Education Board' },
    { year: '2024', title: '10,000+ Students', description: 'Serving students across all provinces' },
    { year: '2026', title: 'Regional Expansion', description: 'Expanding to neighboring countries' }
  ];
}


