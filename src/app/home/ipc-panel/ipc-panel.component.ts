import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ipc-panel',
  templateUrl: './ipc-panel.component.html',
  styleUrls: ['./ipc-panel.component.scss'],
})
export class IpcPanelComponent implements OnInit {
  topLawyers = [
    { name: 'Julia', description: `Family Lawyer ,Criminal Lawyer`, image: '../../../assets/Lawyers/lawyer_1.jpg', address: `Noida, Sector 64`, rating: 4.4, caseCount: 280, successRate: 80, experience: 6 },
    { name: 'Fali Sam Nariman', description: `Media And Entertainment, Immigration Lawyer`, image: '../../../assets/Lawyers/lawyer_2.png', address: `Gurgaon, Sector 49`, rating: 4.0, caseCount: 590, successRate: 75, experience: 3 },
    { name: 'Aditya', description: `Domestic Violence ,Corporate Lawyer`, image: '../../../assets/Lawyers/lawyer_3.jfif', address: `Hajipur, Patna, Bihar`, rating: 4.5, caseCount: 2964, successRate: 68, experience: 8 },
    { name: 'Rohit', description: `Corporate Lawyer, Family Lawyer`, image: '../../../assets/Lawyers/lawyer_4.jfif', address: `GopalGunj, Sector 9`, rating: 4.0, caseCount: 300, successRate: 75, experience: 3 },
    { name: 'Ricky Chopra', description: `Media And Entertainment ,Immigration Lawyer`, image: '../../../assets/Lawyers/lawyer_5.png', address: `Ashok Nagar, Sector 4`, rating: 4.0, caseCount: 285, successRate: 67, experience: 4 },
    { name: 'Kavya Gandhi', description: `Corporate Lawyer, Immigration Lawyer`, image: '../../../assets/Lawyers/lawyer_6.jpg', address: `Sarita Vihar, Mumbai, Sector 11`, rating: 3.7, caseCount: 150, successRate: 59, experience: 4 },
    { name: 'H Gouri Shankar', description: `Family Lawyer ,Criminal Lawyer`, image: '../../../assets/Lawyers/lawyer_7.jfif', address: `Gurgaon, Sector 49`, rating: 4.0, caseCount: 435, successRate: 75, experience: 6 },
    { name: 'Madhuri Bakshi', description: `Cheque Bounce, Family Lawyer`, image: '../../../assets/Lawyers/lawyer_8.jpg', address: `Gopi Nagar, Pune`, rating: 3.5, caseCount: 257, successRate: 54, experience: 7 },
    // Add more lawyer data as needed
  ];

  ipcSections = [
    'Section 497 IPC', 'Section 354 IPC', 'Section 34 IPC', 'Section 506 IPC', 'Section 304 IPC', 'Section 144 IPC',
    'Section 498A IPC', 'Section 120B IPC', 'Section 376 IPC', 'Section 307 IPC', 'Section 302 IPC', 'Section 420 IPC',
    'Section 377 IPC', 'Section 304B IPC', 'Section 409 IPC', 'Section 341 IPC', 'Section 324 IPC', 'Section 451 IPC',
    'Section 323 IPC', 'Section 326 IPC', 'Section 149 IPC', 'Section 406 IPC', 'Section 452 IPC', 'Section 294 IPC',
    'Section 448 IPC', 'Section 138 IPC', 'Section 295A IPC', 'Section 427 IPC', 'Section 300 IPC', 'Section 511 IPC',
    'Section 182 IPC', 'Section 498 IPC', 'Section 188 IPC', 'Section 494 IPC', 'Section 353 IPC', 'Section 153A IPC',
    'Section 201 IPC', 'Section 409 IPC', 'Section 311 IPC', 'Section 225 IPC', 'Section 380 IPC', 'Section 336 IPC',
    'Section 464 IPC', 'Section 353 IPC', 'Section 420B IPC', 'Section 489 IPC', 'Section 498B IPC', 'Section 120 IPC',
    'Section 324B IPC', 'Section 505 IPC', 'Section 511B IPC', 'Section 364 IPC', 'Section 493 IPC', 'Section 225B IPC'
    // Add more IPC sections as needed
  ];
  constructor(
    private _router: Router
  ) { }

  ngOnInit() { }

  seeAll() {
    this._router.navigate(['/home/advocates'])
  }

  advocateProfile() {
    this._router.navigate(['/home/advocateportfolio'])
  }
}
