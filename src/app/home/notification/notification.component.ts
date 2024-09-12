import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notifications = [
    { type: 'caseDate', label: 'Your next case date is on 2024-08-01.' },
    { type: 'chat', label: 'You have a new message from John Doe.' },
    { type: 'general', label: 'Most Popular Lawyer Near by You!' },
    { type: 'general', label: 'Most Popular Lawyer Near by You!' },
    { type: 'chat', label: 'You have a new message from John Doe.' },
    { type: 'caseDate', label: 'Your next case date is on 2024-08-01.' },
    { type: 'chat', label: 'You have a new message from John Doe.' },
    { type: 'general', label: 'Most Popular Lawyer Near by You!' },
    { type: 'general', label: 'Most Popular Lawyer Near by You!' },
    { type: 'chat', label: 'You have a new message from John Doe.' },
    // Add more notifications as needed
  ];

  constructor() {}

  ngOnInit() {}

  getIcon(type: string): string {
    switch (type) {
      case 'caseDate':
        return 'calendar';
      case 'chat':
        return 'chatbubbles';
      case 'general':
        return 'notifications-circle';
      default:
        return 'alert-circle';
    }
  }
}
