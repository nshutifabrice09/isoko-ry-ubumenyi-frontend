import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './instructors.html',
  styleUrl: './instructors.css',
})
export class Instructors {
  selectedSubject = 'All';
  
  subjects = ['All', 'Mathematics', 'Science', 'English', 'Kinyarwanda', 'Social Studies', 'Sports'];

  instructors = [
    {
      id: 1,
      name: 'Dr. Emmanuel Nkusi',
      subject: 'Mathematics',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
      bio: 'PhD in Mathematics Education with 15 years teaching experience',
      students: 1250,
      rating: 4.9,
      courses: 8,
      specialties: ['Algebra', 'Geometry', 'Calculus']
    },
    {
      id: 2,
      name: 'Prof. Claudine Mukamana',
      subject: 'Science',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
      bio: 'Former university professor specializing in Biology and Chemistry',
      students: 980,
      rating: 4.8,
      courses: 6,
      specialties: ['Biology', 'Chemistry', 'Physics']
    },
    {
      id: 3,
      name: 'Mr. Jean Paul Habimana',
      subject: 'English',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      bio: 'Cambridge certified English instructor with international experience',
      students: 1380,
      rating: 4.9,
      courses: 10,
      specialties: ['Grammar', 'Writing', 'Speaking']
    },
    {
      id: 4,
      name: 'Mrs. Françoise Uwera',
      subject: 'Kinyarwanda',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
      bio: 'Expert in Kinyarwanda literature and language pedagogy',
      students: 1450,
      rating: 5.0,
      courses: 7,
      specialties: ['Grammar', 'Literature', 'Composition']
    },
    {
      id: 5,
      name: 'Mr. Patrick Mugisha',
      subject: 'Social Studies',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      bio: 'Historian and geographer passionate about Rwanda\'s heritage',
      students: 890,
      rating: 4.7,
      courses: 5,
      specialties: ['History', 'Geography', 'Civics']
    },
    {
      id: 6,
      name: 'Coach Marie Umutoni',
      subject: 'Sports',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      bio: 'National athletics champion and certified PE instructor',
      students: 1120,
      rating: 4.9,
      courses: 4,
      specialties: ['Athletics', 'Team Sports', 'Health']
    },
    {
      id: 7,
      name: 'Dr. Richard Kayitare',
      subject: 'Mathematics',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&h=300&fit=crop',
      bio: 'Award-winning mathematics educator and author',
      students: 1100,
      rating: 4.8,
      courses: 9,
      specialties: ['Problem Solving', 'Statistics', 'Logic']
    },
    {
      id: 8,
      name: 'Ms. Divine Ingabire',
      subject: 'Science',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
      bio: 'Environmental scientist passionate about hands-on learning',
      students: 850,
      rating: 4.9,
      courses: 5,
      specialties: ['Environmental Science', 'Experiments', 'Earth Science']
    }
  ];

  get filteredInstructors() {
    if (this.selectedSubject === 'All') {
      return this.instructors;
    }
    return this.instructors.filter(i => i.subject === this.selectedSubject);
  }
}
