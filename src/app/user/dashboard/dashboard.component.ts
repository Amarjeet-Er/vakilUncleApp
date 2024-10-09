import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  slider_data: any;
  top_Lawyers: any;



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
  img_url: any;
  Lawyers_types: any;
  login: any;
  login_data: any;
  nearest_Lawyers: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    this.login = localStorage.getItem('userLoginData');
    this.login_data = JSON.parse(this.login);

    this._shared.img_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
  }

  ngOnInit(): void {
    this.startPlaceholderRotation();


    this._crud.get_banner_slide().subscribe(
      (response) => {
        this.slider_data = response.data;
      }
    )
    this._crud.get_top_advocated().subscribe(
      (response) => {
        if (response.status === true) {
          console.log(response.data, 'top lawyers');

          this.top_Lawyers = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )

    this._crud.get_nearest_lawyer(this.login_data.id).subscribe(
      (response) => {
        if (response.status === true) {
          console.log(response.data, 'top nearest');
          this.nearest_Lawyers = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )

    this._crud.get_advocate_type().subscribe(
      (response) => {
        if (response.status === true) {
          console.log(response.data, 'types lawyers');
          const LawyerTypes = [
            { icon: '../../../assets/menuIcon/civil_lawyer.png' },
            { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
            { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
            { icon: '../../../assets/menuIcon/property_lawyer.png' },
            { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
            { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
            { icon: '../../../assets/menuIcon/tax_lawyer.png' },
            { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
            { icon: '../../../assets/menuIcon/civil_lawyer.png' },
            { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
            { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
            { icon: '../../../assets/menuIcon/property_lawyer.png' },
            { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
            { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
            { icon: '../../../assets/menuIcon/tax_lawyer.png' },
            { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
            { icon: '../../../assets/menuIcon/civil_lawyer.png' },
            { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
            { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
            { icon: '../../../assets/menuIcon/property_lawyer.png' },
            { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
            { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
            { icon: '../../../assets/menuIcon/tax_lawyer.png' },
            { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
            { icon: '../../../assets/menuIcon/civil_lawyer.png' },
            { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
            { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
            { icon: '../../../assets/menuIcon/property_lawyer.png' },
            { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
            { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
            { icon: '../../../assets/menuIcon/tax_lawyer.png' },
            { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
            { icon: '../../../assets/menuIcon/civil_lawyer.png' },
            { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
            { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
            { icon: '../../../assets/menuIcon/property_lawyer.png' },
            { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
            { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
            { icon: '../../../assets/menuIcon/tax_lawyer.png' },
            { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
            { icon: '../../../assets/menuIcon/civil_lawyer.png' },
            { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
            { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
            { icon: '../../../assets/menuIcon/property_lawyer.png' },
            { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
            { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
            { icon: '../../../assets/menuIcon/tax_lawyer.png' },
            { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
            { icon: '../../../assets/menuIcon/civil_lawyer.png' },
            { icon: '../../../assets/menuIcon/motor_accident_lawyer.png' },
            { icon: '../../../assets/menuIcon/criminal_lawyer.png' },
            { icon: '../../../assets/menuIcon/property_lawyer.png' },
            { icon: '../../../assets/menuIcon/divorce_lawyer.png' },
            { icon: '../../../assets/menuIcon/cheque_bounce_lawyer.png' },
            { icon: '../../../assets/menuIcon/tax_lawyer.png' },
            { icon: '../../../assets/menuIcon/consumer_court_lawyer.png' },
          ];
          // Merging the icon paths with the response data
          this.Lawyers_types = response.data.map((lawyer: any, index: any | number) => ({
            ...lawyer,
            icon: LawyerTypes[index]?.icon || ''  // Safeguard for missing icons
          }));

          console.log(this.Lawyers_types);
        } else {
          this._shared.tostErrorTop('No Record Found');
        }
      }
    );


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
  advocate_Profile(data: any) {
    localStorage.setItem('vakilProfile', JSON.stringify(data.advId))
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
