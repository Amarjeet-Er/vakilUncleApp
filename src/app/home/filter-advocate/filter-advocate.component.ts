import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-advocate',
  templateUrl: './filter-advocate.component.html',
  styleUrls: ['./filter-advocate.component.scss'],
})
export class FilterAdvocateComponent   implements OnInit {
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

  constructor(
    private _router:Router
  ) { }

  ngOnInit() {}

  advocateProfile() {
    this._router.navigate(['/home/advocateportfolio'])
  }
}
