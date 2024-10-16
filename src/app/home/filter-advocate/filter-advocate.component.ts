import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-filter-advocate',
  templateUrl: './filter-advocate.component.html',
  styleUrls: ['./filter-advocate.component.scss'],
})
export class FilterAdvocateComponent implements OnInit {
  selectedList: string = 'city';
  city_list: any[] = [];
  adv_list: any[] = [];
  court_list: any[] = [];
  filter_form!: FormGroup;

  experience_list = [
    { experience: 'Less than 5 Years' },
    { experience: '5-10 Years' },
    { experience: '10-15 Years' },
    { experience: '15-20 Years' },
    { experience: 'More Than 20 Years' },
  ];

  rating_list = [
    { rating: '1-2' },
    { rating: '2-3' },
    { rating: '3-4' },
    { rating: '4-5' },
    { rating: '5' },
  ];

  gender_list = [
    { gender: 'Male' },
    { gender: 'Female' },
    { gender: 'Other' },
  ];

  activity_list = [
    { name: 'By Alphabetically' },
    { name: 'By Experience' },
  ];

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.fetchData();
  }

  initializeForm() {
    this.filter_form = this._fb.group({
      city: [''],
      advType: [''],
      court: [''],
      experience: [''],
      gender: [''],
      rating: [''],
      activity: [''],
    });
  }

  fetchData() {
    this._crud.get_city_list().subscribe((res: any) => {
      this.city_list = res.data;
    });

    this._crud.get_advocate_type().subscribe((res: any) => {
      this.adv_list = res.data;
    });

    this._crud.get_court_list().subscribe((res: any) => {
      this.court_list = res.data;
    });
  }

  onFilter() {
    const formData = new FormData();
    formData.append('city', this.filter_form.get('city')?.value);    
    formData.append('advType', this.filter_form.get('advType')?.value);    
    formData.append('court', this.filter_form.get('court')?.value);
    formData.append('experience', this.filter_form.get('experience')?.value);
    formData.append('gender', this.filter_form.get('gender')?.value);
    formData.append('rating', this.filter_form.get('rating')?.value);
    formData.append('activity', this.filter_form.get('activity')?.value);

    console.log(formData, 'form data');
    
    this._crud.post_filter_advocate(formData).subscribe(
      (res: any) => {
        console.log(res, 'filter result');
      },
      (error) => {
        console.error('Error filtering data:', error);
      }
    );
  }

  selectList(list: string) {
    this.selectedList = list;
  }
}
