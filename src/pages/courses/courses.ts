import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  selectedGrade = 'Primary 6';

  courses = [
    {
      id: 1,
      title: 'Mathematics',
      icon: 'calculator',
      color: 'from-purple-500 to-pink-500',
      description: 'Master numbers, algebra, geometry and problem-solving skills',
      topics: ['Fractions & Decimals', 'Basic Algebra', 'Geometry', 'Word Problems'],
      lessons: 45,
      duration: '6 months',
      students: 1250
    },
    {
      id: 2,
      title: 'Science',
      icon: 'flask',
      color: 'from-green-500 to-teal-500',
      description: 'Explore the natural world through experiments and discovery',
      topics: ['Living Things', 'Matter & Energy', 'Earth Science', 'Simple Machines'],
      lessons: 40,
      duration: '6 months',
      students: 980
    },
    {
      id: 3,
      title: 'Kinyarwanda',
      icon: 'chat-left-text',
      color: 'from-yellow-500 to-orange-500',
      description: 'Enhance your mother tongue reading, writing and speaking skills',
      topics: ['Grammar', 'Composition', 'Literature', 'Oral Skills'],
      lessons: 38,
      duration: '6 months',
      students: 1450
    },
    {
      id: 4,
      title: 'English',
      icon: 'book',
      color: 'from-blue-500 to-indigo-500',
      description: 'Build strong English language foundation and communication',
      topics: ['Reading', 'Writing', 'Grammar', 'Speaking & Listening'],
      lessons: 42,
      duration: '6 months',
      students: 1380
    },
    {
      id: 5,
      title: 'Social Studies',
      icon: 'globe',
      color: 'from-red-500 to-pink-500',
      description: 'Learn about history, geography, culture and citizenship',
      topics: ['Rwanda History', 'Geography', 'Civics', 'Economics Basics'],
      lessons: 35,
      duration: '6 months',
      students: 890
    },
    {
      id: 6,
      title: 'Sports & PE',
      icon: 'trophy',
      color: 'from-cyan-500 to-blue-500',
      description: 'Develop physical fitness, teamwork and sportsmanship',
      topics: ['Team Sports', 'Athletics', 'Health & Nutrition', 'Fair Play'],
      lessons: 30,
      duration: '6 months',
      students: 1120
    }
  ];
}
