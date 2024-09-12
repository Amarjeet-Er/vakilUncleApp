import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit , OnDestroy{
  slider_data = [
    { Slider_img: '../../../assets/slider/slider_4.jfif' },
    { Slider_img: '../../../assets/slider/slider_5.jfif' },
    { Slider_img: '../../../assets/slider/slider_6.jfif' },
    { Slider_img: '../../../assets/slider/slider_7.jfif' },
    { Slider_img: '../../../assets/slider/slider_1.jpg' },
    { Slider_img: '../../../assets/slider/slider_2.jpg' },
    { Slider_img: '../../../assets/slider/slider_3.jpg' },
  ];

  LawyerTypes = [
    { name: 'Civil Lawyer', icon: '../../../assets/menuIcon/civil_lawyer.png' },
    { name: 'Motor Accident lawyer', icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
    { name: 'Criminal Lawyer', icon: '../../../assets/menuIcon/criminal_lawyer.png' },
    { name: 'Property Lawyer', icon: '../../../assets/menuIcon/property_lawyer.png' },
    { name: 'Divorce Lawyer', icon: '../../../assets/menuIcon/divorce_lawyer.png' },
    { name: 'Cheque Bounce Lawyer', icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
    { name: 'Tax Lawyer', icon: '../../../assets/menuIcon/tax_lawyer.png' },
    { name: 'Consumer Court Lawyer', icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
  ];


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

  properityLawyer = [
    { name: 'Aditya', description: `Domestic Violence ,Corporate Lawyer`, image: '../../../assets/Lawyers/lawyer_3.jfif', address: `Hajipur, Patna, Bihar`, rating: 4.5, caseCount: 2964, successRate: 68, experience: 8 },
    { name: 'Rohit', description: `Corporate Lawyer, Family Lawyer`, image: '../../../assets/Lawyers/lawyer_4.jfif', address: `GopalGunj, Sector 9`, rating: 4.0, caseCount: 300, successRate: 75, experience: 3 },
    { name: 'H Gouri Shankar', description: `Family Lawyer ,Criminal Lawyer`, image: '../../../assets/Lawyers/lawyer_7.jfif', address: `Gurgaon, Sector 49`, rating: 4.0, caseCount: 435, successRate: 75, experience: 6 },
    { name: 'Madhuri Bakshi', description: `Cheque Bounce, Family Lawyer`, image: '../../../assets/Lawyers/lawyer_8.jpg', address: `Gopi Nagar, Pune`, rating: 3.5, caseCount: 257, successRate: 54, experience: 7 },
    { name: 'Julia', description: `Family Lawyer ,Criminal Lawyer`, image: '../../../assets/Lawyers/lawyer_1.jpg', address: `Noida, Sector 64`, rating: 4.4, caseCount: 280, successRate: 80, experience: 6 },
    { name: 'Fali Sam Nariman', description: `Media And Entertainment, Immigration Lawyer`, image: '../../../assets/Lawyers/lawyer_2.png', address: `Gurgaon, Sector 49`, rating: 4.0, caseCount: 590, successRate: 75, experience: 3 },
    { name: 'Ricky Chopra', description: `Media And Entertainment ,Immigration Lawyer`, image: '../../../assets/Lawyers/lawyer_5.png', address: `Ashok Nagar, Sector 4`, rating: 4.0, caseCount: 285, successRate: 67, experience: 4 },
    { name: 'Kavya Gandhi', description: `Corporate Lawyer, Immigration Lawyer`, image: '../../../assets/Lawyers/lawyer_6.jpg', address: `Sarita Vihar, Mumbai, Sector 11`, rating: 3.7, caseCount: 150, successRate: 59, experience: 4 },
    // Add more lawyer data as needed
  ];

  civilLawyer = [
    { name: 'Kavya Gandhi', description: `Corporate Lawyer, Immigration Lawyer`, image: '../../../assets/Lawyers/lawyer_6.jpg', address: `Sarita Vihar, Mumbai, Sector 11`, rating: 3.7, caseCount: 150, successRate: 59, experience: 4 },
    { name: 'Ricky Chopra', description: `Media And Entertainment ,Immigration Lawyer`, image: '../../../assets/Lawyers/lawyer_5.png', address: `Ashok Nagar, Sector 4`, rating: 4.0, caseCount: 285, successRate: 67, experience: 4 },
    { name: 'Rohit', description: `Corporate Lawyer, Family Lawyer`, image: '../../../assets/Lawyers/lawyer_4.jfif', address: `GopalGunj, Sector 9`, rating: 4.0, caseCount: 300, successRate: 75, experience: 3 },
    { name: 'H Gouri Shankar', description: `Family Lawyer ,Criminal Lawyer`, image: '../../../assets/Lawyers/lawyer_7.jfif', address: `Gurgaon, Sector 49`, rating: 4.0, caseCount: 435, successRate: 75, experience: 6 },
    { name: 'Aditya', description: `Domestic Violence ,Corporate Lawyer`, image: '../../../assets/Lawyers/lawyer_3.jfif', address: `Hajipur, Patna, Bihar`, rating: 4.5, caseCount: 2964, successRate: 68, experience: 8 },
    { name: 'Julia', description: `Family Lawyer ,Criminal Lawyer`, image: '../../../assets/Lawyers/lawyer_1.jpg', address: `Noida, Sector 64`, rating: 4.4, caseCount: 280, successRate: 80, experience: 6 },
    { name: 'Madhuri Bakshi', description: `Cheque Bounce, Family Lawyer`, image: '../../../assets/Lawyers/lawyer_8.jpg', address: `Gopi Nagar, Pune`, rating: 3.5, caseCount: 257, successRate: 54, experience: 7 },
    { name: 'Fali Sam Nariman', description: `Media And Entertainment, Immigration Lawyer`, image: '../../../assets/Lawyers/lawyer_2.png', address: `Gurgaon, Sector 49`, rating: 4.0, caseCount: 590, successRate: 75, experience: 3 },
    // Add more lawyer data as needed
  ];

  placeholderTexts: string[] = ['"top lawyer"', '"courts name"', '"lawyer name"', '"city name"'];
  currentPlaceholder: string = this.placeholderTexts[0];
  placeholderIndex: number = 0;
  intervalId: any;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.startPlaceholderRotation();

  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startPlaceholderRotation() {
    this.intervalId = setInterval(() => {
      this.placeholderIndex = (this.placeholderIndex + 1) % this.placeholderTexts.length;
      this.currentPlaceholder = this.placeholderTexts[this.placeholderIndex];
    }, 3000); 
  }

  searchPage() {
    this._router.navigate(['/home/search'])
  }

  allKanoon() {
    this._router.navigate(['/home/kanoonlist'])
  }

  seeAll() {
    this._router.navigate(['/home/advocates'])
  }

  advocateProfile() {
    this._router.navigate(['/home/advocateportfolio'])
  }

  allCategory() {
    this._router.navigate(['/home/advocatecategory'])
  }

  filterAdvocate() {
    this._router.navigate(['/home/filteradvocate'])
  }

  membership() {
    this._router.navigate(['/home/membership'])
  }

  robotChat() {
    this._router.navigate(['/home/robotchat'])
  }
}
