import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vakil-profile',
  templateUrl: './vakil-profile.component.html',
  styleUrls: ['./vakil-profile.component.scss'],
})
export class VakilProfileComponent   implements OnInit {

  selectedProfileImage: any;
  profileInfo: any;

  constructor() {
    // Initializing profileInfo with sample data
    this.profileInfo = {
      Name: 'Rohit Kumar',
      userId: 'VU-75376',
      Email: 'rohitkumar@gmail.com',
      Password: 'password123',
      Phone_number: '1234567890',
      Profile_image: '../../../assets/Lawyers/lawyer_4.jfif',
      City: 'Ashok Nagar',
      OfficeAddress : 'Ashok Nagar, New Delhi, Block-A',
      Gender: 'Male',
      EnrollmentNumber: 'KAR/3036/2006',
      Courts: 'Delhi High Court, Karnataka High Court',
      LawyerType : '6 Selected',
      Experience : '13',
      SelfDescription : 'Hii, This is Advocate Rohit Kumar',
    };
  }

  ngOnInit() {}

  openFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedProfileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  }

  submit() {
    console.log('Profile Info Submitted:', this.profileInfo);
  }
}
