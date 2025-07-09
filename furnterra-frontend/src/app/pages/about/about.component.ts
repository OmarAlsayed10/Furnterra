import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  
  teamMembers = [
    {
      name: 'Founder',
      position: 'Founder & CEO',
      image: 'assets/team/sarah.jpg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
    },
    {
      name: 'Head of Design',
      position: 'Head of Design',
      image: 'assets/team/michael.jpg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
    },
    {
      name: 'Quality Assurance',
      position: 'Quality Assurance Director',
      image: 'assets/team/emma.jpg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
    }
  ];

  milestones = [
    {
      year: '2018',
      title: 'Company Founded',
      description: 'Furnterra was established with a vision to transform homes through quality furniture.'
    },
    {
      year: '2020',
      title: 'Online Launch',
      description: 'Expanded our reach with our e-commerce platform, making quality furniture accessible nationwide.'
    },
    {
      year: '2022',
      title: 'Sustainable Materials',
      description: 'Committed to using 100% sustainable and eco-friendly materials in all our products.'
    },
    {
      year: '2024',
      title: '50,000+ Happy Customers',
      description: 'Reached a milestone of serving over 50,000 satisfied customers across the country.'
    }
  ];

  values = [
    {
      icon: '🎨',
      title: 'Craftsmanship',
      description: 'Every piece is handcrafted with attention to detail and superior quality materials.'
    },
    {
      icon: '🏠',
      title: 'Home Comfort',
      description: 'We believe your home should be your sanctuary, filled with furniture that reflects your style.'
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'Committed to environmental responsibility through sustainable sourcing and eco-friendly practices.'
    },
    {
      icon: '💝',
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority, from selection to delivery and beyond.'
    }
  ];

  constructor() { }
}