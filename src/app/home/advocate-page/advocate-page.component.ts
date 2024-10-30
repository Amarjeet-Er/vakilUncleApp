import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-advocate-page',
  templateUrl: './advocate-page.component.html',
  styleUrls: ['./advocate-page.component.scss'],
})
export class AdvocatePageComponent implements OnInit {
  @ViewChild('advocateFilter') advocateFilter!: IonModal;
  selectedList: string = 'city';
  city_list: any[] = [];
  adv_list: any[] = [];
  court_list: any[] = [];
  filter_form!: FormGroup;
  img_url: string | undefined;
  advocated_list: any[] = [];
  parameter: any;

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


  filterAdvocate() {
    this.advocateFilter.present();
  }

  selectList(list: string) {
    this.selectedList = list;
  }


  onFilter() {
    const parameter = {
      city: this.filter_form.get('city')?.value,
      advType: this.filter_form.get('advType')?.value,
      court: this.filter_form.get('court')?.value,
      experience: this.filter_form.get('experience')?.value,
      gender: this.filter_form.get('gender')?.value,
      rating: this.filter_form.get('rating')?.value,
      activity: this.filter_form.get('activity')?.value
    }

    this._crud.get_total_advocate_list(parameter).subscribe(
      (res: any) => {
        console.log(res.data, 'filter result');
        this.advocated_list = res.data;
        this.filter_form.reset()
        this.advocateFilter.dismiss()
      },
      (error) => {
        console.error('Error filtering data:', error);
        this.filter_form.reset()
        this.advocated_list = error.data;
        this.errorMes = 'Result not found!'
        this._shared.tostErrorTop('Result not found!')
        this.advocateFilter.dismiss()
      }
    );
  }

  advocate_Profile(data: any) {
    localStorage.setItem('vakilProfile', JSON.stringify(data.advId));
    this._router.navigate(['/home/advocateportfolio']);
  }

}
