import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-advocate-filter',
  templateUrl: './advocate-filter.component.html',
  styleUrls: ['./advocate-filter.component.scss'],
})
export class AdvocateFilterComponent implements OnInit {
  selectedList: string = 'city';
  city_list: any[] = [];
  adv_list: any[] = [];
  court_list: any[] = [];
  filter_form!: FormGroup;
  img_url: string | undefined;
  advocated_list: any[] = [];
  parameter: any;

  experience_list = [
    { experience: 'Less than 5 Years', id: '1,5' },
    { experience: '5-10 Years', id: '5,10' },
    { experience: '10-15 Years', id: '10,15' },
    { experience: '15-20 Years', id: '15,20' },
    { experience: 'More Than 20 Years', id: '20,0' },
  ];

  rating_list = [
    { rating: '1-2', id: '1' },
    { rating: '2-3', id: '2' },
    { rating: '3-4', id: '3' },
    { rating: '4-5', id: '4' },
    { rating: '5', id: '5' },
  ];

  gender_list = [
    { gender: 'Male' },
    { gender: 'Female' },
    { gender: 'Other' },
  ];

  activity_list = [
    { name: 'By Alphabetically', id: '1' },
    { name: 'By Experience', id: '2' },
  ];
  errorMes: any;
  advType: any;
  filter_data: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService,
    private _fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.initializeForm();
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.fetchData();
    });
  }

  initializeForm() {
    this.filter_form = this._fb.group({
      city: [],
      advType: [],
      court: [],
      experience: [],
      gender: [],
      rating: [],
      activity: [],
    });
  }

  fetchData() {
    this._shared.sharedData.subscribe(
      (res: any) => {
        this.advType = res;
        const parameter = {
          advType: this.advType,
        }
        this._crud.get_total_advocate_list(parameter).subscribe(
          (res: any) => {
            console.log(res.data, 'filter result');
            this.advocated_list = res.data
          }
        )
      }
    )
    this._crud.get_total_advocate_list(this.advType).subscribe(
      (res: any) => {
        console.log(res.data, 'filter result');
        this.advocated_list = res.data
      }
    )
    this._shared.img_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
    this._crud.get_city_list().subscribe((res: any) => {
      this.city_list = res.data;
      this.filter_data = res.data;
    });

    this._crud.get_advocate_type().subscribe((res: any) => {
      this.adv_list = res.data;
      this.filter_data = res.data;
    });

    this._crud.get_court_list().subscribe((res: any) => {
      this.court_list = res.data;
      this.filter_data = res.data;
    });
  }

  selectList(list: string) {
    this.selectedList = list;
    this.fetchData()
  }


  onFilter() {
    const parameter = {
      city: this.filter_form.get('city')?.value,
      advType: this.filter_form.get('advType')?.value,
      court: this.filter_form.get('court')?.value,
      experiance: this.filter_form.get('experience')?.value,
      gender: this.filter_form.get('gender')?.value,
      rating: this.filter_form.get('rating')?.value,
      activity: this.filter_form.get('activity')?.value
    }

    this._crud.get_total_advocate_list(parameter).subscribe(
      (res: any) => {
        console.log(res.data, 'filter result');
        this.advocated_list = res.data;
        this.filter_form.reset()
        this._router.navigate(['/user/home/advocate'])
        this.errorMes = ''
      },
      (error) => {
        console.error('Error filtering data:', error);
        this.filter_form.reset()
        this.advocated_list = error.data;
        this.errorMes = 'Result not found!'
        this._shared.tostErrorTop('Result not found!')
        this._router.navigate(['/user/home/advocate'])
      }
    );
  }

  advocate_Profile(data: any) {
    localStorage.setItem('vakilProfile', JSON.stringify(data.advId));
    this._router.navigate(['/home/advocateportfolio']);
  }

  citySearch(event: any) {
    const filter = event.target.value.toLowerCase();

    this.city_list = this.filter_data.filter((data: any) =>
      data?.name?.toString().toLowerCase().includes(filter)
    );
  }
  advtypSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.adv_list = this.filter_data.filter((data: any) =>
      data?.name?.toString().toLowerCase().includes(filter)
    );
  }
  coutSearch(event: any) {
    const filter = event.target.value.toLowerCase();

    this.court_list = this.filter_data.filter((data: any) =>
      data?.courtName?.toString().toLowerCase().includes(filter)
    );
  }
}
