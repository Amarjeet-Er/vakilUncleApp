import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { filter, forkJoin } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
interface Adv {
  image: string,
  adid: string,
  id: string
  imageUrl: string
  status: string
  title: string
  userid: string,
  advocateName?: string;  // Optional properties
  experiance?: string;
  stateName?: string;
  cityName?: string;
  advocateTypeName?: [];
  totalUserRating?: string;
  avgUserRating: number;
  profilePath?: string;
}

interface Advocate {
  advocateName: string,
  experiance: string,
  stateName: string,
  cityName: string,
  advocateTypeName: [],
  totalUserRating: string,
  avgUserRating: number,
  profilePath: string,
  image: string,
  adid: string,
  id: string
  imageUrl: string
  status: string
  title: string
  userid: string,
}




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
  parameter: any;

  advocated_list: Advocate[] = []; // Example type
  advertisementList: Adv[] = [];
  finalDataList: (typeof this.advocated_list[0] | typeof this.advertisementList[0])[] = [];
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
  advocates: any;
  advertisements: any;
  combinedList: any;

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
      this.getAdvocateData();
      this.getAdvertisementData();
    });

    setTimeout(() => {
      this.getFinalList();
    }, 1000);
  }


  getAdvertisementData() {
    this._crud.get_image_banner(1).subscribe(
      (res: any) => {
        console.log(res);
        this.advertisementList = res.data
      }
    )
  }

  getFinalList() {
    this.finalDataList = [];

    const advocatedBatchSize = 5;
    let advocatedIndex = 0;
    let advertisementIndex = 0;

    while (advocatedIndex < this.advocated_list.length || advertisementIndex < this.advertisementList.length) {
      for (let i = 0; i < advocatedBatchSize && advocatedIndex < this.advocated_list.length; i++) {
        this.finalDataList.push(this.advocated_list[advocatedIndex]);
        advocatedIndex++;
      }

      if (advertisementIndex < this.advertisementList.length) {
        this.finalDataList.push(this.advertisementList[advertisementIndex]);
        advertisementIndex++;
      }
    }
    console.log(this.finalDataList);
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

  filterAdvocate() {
    this.advocateFilter.present();
    this.filter_form.reset()
    this.getAdvocateData();
  }
  selectList(list: string) {
    this.selectedList = list;
    this.getAdvocateData();
  }

  getAdvocateData() {
    this._shared.sharedData.subscribe(
      (res: any) => {
        this.advType = res;
        const parameter = {
          advType: this.advType,
        }
        this._crud.get_total_advocate_list(parameter).subscribe(
          (res: any) => {
            console.log(res.data);
            this.advocated_list = res?.data
          }
        )
      }
    )
    this._crud.get_total_advocate_list(this.advType).subscribe(
      (res: any) => {
        console.log(res.data,);
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
        this.advocateFilter.dismiss()
        this.errorMes = ''
        this.getFinalList()
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
