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
  city_list: any;
  vakilId: any;
  vakil_id: any;

  constructor(
    private fb: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService,
    private _router: Router

  ) {

    this.vakilId = localStorage.getItem('vakilId');
    this.vakil_id = JSON.parse(this.vakilId);

    this._crud.get_city_list().subscribe(
      (response: any) => {
        console.log(response.data);
        if (response.data) {
          this.city_list = response.data;
        }
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required]
    });
  }
  onBack() {
    localStorage.removeItem('vakilId');
    this._router.navigate(['/home/advocateportfolio']);
  }
  submitForm() {
    const formdata = new FormData()
    console.log(this.enquiryForm.value, 'sent message');
    formdata.append('clientName', this.enquiryForm.get('name')?.value);
    formdata.append('Email', this.enquiryForm.get('email')?.value);
    formdata.append('contactNume', this.enquiryForm.get('contact')?.value);
    formdata.append('cityId', this.enquiryForm.get('city')?.value);
    formdata.append('vakilId', this.vakil_id);
    if (this.enquiryForm.valid) {
      this._crud.add_enquiry(formdata).subscribe(
        (res: any) => {
          console.log(res, 'res');
          if (res.status === true) {
            this.enquiryForm.reset();
            localStorage.removeItem('vakilId');
            this._router.navigate(['/home/advocateportfolio']);
            this._shared.tostSuccessTop(res.message);
          }
          else {
            this._shared.tostErrorTop(res.message);
          }
        },
        error => this._shared.tostErrorTop(error)
      )
    }
    else {
      this._shared.tostErrorTop('Please fill all the fields');
    }
  }
}