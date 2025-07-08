import { Component } from '@angular/core';

@Component({
  selector: 'app-explore-features',
  templateUrl: './explore-features.component.html',
  styleUrls: ['./explore-features.component.scss']
})
export class ExploreFeaturesComponent {
  features = [
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/942/942748.png',
      title: 'Job Management',
      description: 'Post, manage, and track ads with detailed analytics and candidate ranking.'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      title: 'Applicant Tracking',
      description: 'Move candidates through screening, interviews, and offers — all in one ATS.'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3602/3602123.png',
      title: 'Collaboration Tools',
      description: 'Real-time messaging, interview scheduling, and feedback for teams and candidates.'
    }
  ];
}
