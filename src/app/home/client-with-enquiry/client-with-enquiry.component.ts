import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-with-enquiry',
  templateUrl: './client-with-enquiry.component.html',
  styleUrls: ['./client-with-enquiry.component.scss'],
})
export class ClientWithEnquiryComponent implements OnInit {


  ngOnInit() { }
  enquiryForm: FormGroup;
  cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']; // Replace with your cities list

  constructor(private fb: FormBuilder) {
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.enquiryForm.valid) {
      console.log('Form Submitted', this.enquiryForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}