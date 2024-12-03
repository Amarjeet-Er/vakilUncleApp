import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-client-with-enquiry',
  templateUrl: './client-with-enquiry.component.html',
  styleUrls: ['./client-with-enquiry.component.scss'],
})
export class ClientWithEnquiryComponent implements OnInit {

  enquiryForm!: FormGroup;
  cityList: any[] = [];
  vakilId: number | null = null;
  loginData: any = null;
  profileData: any = null;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private sharedService: SharedService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Initialize form
    this.initializeForm();

    // Retrieve data from local storage
    this.retrieveLocalStorageData();

    // Fetch city list
    this.fetchCityList();

    // Fetch client profile
    this.fetchClientProfile();
  }

  // Initialize the enquiry form
  private initializeForm() {
    this.enquiryForm = this.fb.group({
      clientName: ['', Validators.required],
      contactNum: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
    });
  }

  // Retrieve data from local storage
  private retrieveLocalStorageData() {
    const storedVakilId = localStorage.getItem('vakilId');
    const storedLoginData = localStorage.getItem('userLoginData');

    this.vakilId = storedVakilId ? JSON.parse(storedVakilId) : null;
    this.loginData = storedLoginData ? JSON.parse(storedLoginData) : null;
  }

  // Fetch city list from the API
  private fetchCityList() {
    this.crudService.get_city_list().subscribe(
      (response: any) => {
        if (response.data) {
          this.cityList = response.data;
        }
      },
      (error) => this.sharedService.tostErrorTop(error)
    );
  }

  // Fetch client profile from the API
  private fetchClientProfile() {
    if (this.loginData?.id) {
      this.crudService.get_client_profile(this.loginData.id).subscribe(
        (res: any) => {
          if (res.data) {
            this.profileData = res.data;
            this.populateForm(this.profileData);
          }
        },
        (error) => this.sharedService.tostErrorTop(error)
      );
    }
  }

  // Populate form with profile data
  private populateForm(data: any) {
    this.enquiryForm.setValue({
      clientName: data.clientName || '',
      contactNum: data.contactNum || '',
      email: data.email || '',
      city: data.city || '',
    });
  }

  // Navigate back to advocate portfolio
  onBack() {
    localStorage.removeItem('vakilId');
    this.router.navigate(['/home/advocateportfolio']);
  }

  // Submit the enquiry form
  submitForm() {
    if (this.enquiryForm.valid) {
      const formData = new FormData();
      formData.append('clientName', this.enquiryForm.get('clientName')?.value);
      formData.append('contactNum', this.enquiryForm.get('contactNum')?.value);
      formData.append('email', this.enquiryForm.get('email')?.value);
      formData.append('cityId', this.enquiryForm.get('city')?.value);
      if (this.vakilId) formData.append('vakilId', this.vakilId.toString());

      this.crudService.add_enquiry(formData).subscribe(
        (res: any) => {
          if (res.status === true) {
            this.sharedService.tostSuccessTop(res.message);
            this.enquiryForm.reset();
            localStorage.removeItem('vakilId');
            this.router.navigate(['/home/advocateportfolio']);
          } else {
            this.sharedService.tostErrorTop(res.message);
          }
        },
        (error) => this.sharedService.tostErrorTop('Failed to submit enquiry')
      );
    } else {
      this.sharedService.tostErrorTop('Please fill all the fields');
    }
  }
}
