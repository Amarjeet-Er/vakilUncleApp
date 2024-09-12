import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Award {
  name: string;
}

interface Specialization {
  name: string;
}

interface GalleryImage {
  src: string;
}

interface Video {
  thumbnail: string;
}

interface Lawyer {
  name: string;
  profileImg: string;
  rating: number;
  reviews: string;
  phone: string;
  location: string;
  about: string;
  awards: Award[];
  specializations: Specialization[];
  gallery: GalleryImage[];
  videos: Video[];
}

@Component({
  selector: 'app-advocate-portfolio',
  templateUrl: './advocate-portfolio.component.html',
  styleUrls: ['./advocate-portfolio.component.scss'],
})
export class AdvocatePortfolioComponent implements OnInit {

  lawyer: Lawyer = {
    name: 'Julia',
    profileImg: '../../../assets/Lawyers/lawyer_1.jpg',
    rating: 4.4,
    reviews: '3.5K',
    phone: '9834383879',
    location: 'Noida, Sector 64',
    about: `Julia graduated with honors from a prestigious law school. Julia is a member of several legal
            associations, contributing to the development of family and criminal law.`,
    awards: [
      { name: 'Legal Era Awards' },
      { name: 'Forbes India Legal Powerlist' },
      { name: 'India Business Law Journal (IBLJ) Awards' },
      { name: 'Bar Council of India Awards' },
      { name: 'Society of Indian Law Firms (SILF) Awards' },
      { name: 'The Legal 500 India Awards' }
    ],
    specializations: [
      { name: 'Family Lawyer' },
      { name: 'Criminal Lawyer' },
      { name: 'Domestic Violence' },
      { name: 'Corporate Lawyer' }
    ],
    gallery: [
      { src: '../../../assets/images/image_5.jfif' },
      { src: '../../../assets/images/image_3.jfif' },
      { src: '../../../assets/images/image_2.jfif' },
      { src: '../../../assets/images/image_1.jfif' },
      { src: '../../../assets/images/image_4.jfif' },
    ],
    videos: [
      { thumbnail: '../../../assets/slider/slider_8.jpg' },
      { thumbnail: '../../../assets/slider/slider_6.jfif' },
      { thumbnail: '../../../assets/slider/slider_7.jfif' },
      { thumbnail: '../../../assets/slider/slider_2.jpg' },
      { thumbnail: '../../../assets/slider/slider_3.jpg' },
      { thumbnail: '../../../assets/slider/slider_4.jfif' },
      { thumbnail: '../../../assets/slider/slider_1.jpg' },
      { thumbnail: '../../../assets/slider/slider_5.jfif' },
      { thumbnail: '../../../assets/slider/slider_9.png' },
      { thumbnail: '../../../assets/slider/slider_10.jfif' },
    ]
  };

  constructor(private _router: Router) { }

  ngOnInit() {}


  makeCall(phoneNumber: string) {
    const telLink = `tel:${phoneNumber}`;
    window.location.href = telLink;
  }

  chatWithLawyer() {
    this._router.navigate(['/home/chat']);
  }
}
