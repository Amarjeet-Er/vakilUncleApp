import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { filter } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  slider_data: any;
  top_Lawyers: any;
  kanoon_list: any;
  Lawyers_types: any;
  nearest_Lawyers: any;
  top_properity: any;
  top_text: any;
  top_criminal: any;
  top_business_corporate: any;
  top_civil: any;
  top_family: any;
  top_motor_accident: any;
  top_divorce: any;
  top_consumer_court: any;
  top_cheque_bounce: any;

  placeholderTexts: string[] = ['"Top Lawyer"', '"Courts Name"', '"Lawyer Name"', '"City Name"'];
  currentPlaceholder: string = this.placeholderTexts[0];
  placeholderIndex: number = 0;
  intervalId: any;
  img_url: any;
  login_data: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    const login = localStorage.getItem('userLoginData');
    this.login_data = login ? JSON.parse(login) : null;

    this._shared.img_url.subscribe((res: any) => {
      this.img_url = res;
    });
  }

  ngOnInit(): void {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
    this.startPlaceholderRotation();
  }

  loadData() {
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
    this._crud.top_properity_lawyer().subscribe(
      (response) => {
        if (response.status === true) {
          this.top_properity = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )
    this._crud.top_text_lawyer().subscribe(
      (response) => {
        if (response.status === true) {
          this.top_text = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )
    this._crud.top_criminal_lawyer().subscribe(
      (response) => {
        if (response.status === true) {
          this.top_criminal = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )
    this._crud.top_business_corporate_lawyer().subscribe(
      (response) => {
        if (response.status === true) {
          this.top_business_corporate = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )
    this._crud.top_civil_lawyer().subscribe(
      (response) => {
        if (response.status === true) {
          this.top_civil = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )
    this._crud.top_family_lawyer().subscribe(
      (response) => {
        if (response.status === true) {
          this.top_family = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )
    this._crud.top_motor_accident_lawyer().subscribe(
      (response) => {
        if (response.status === true) {
          this.top_motor_accident = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )
    this._crud.top_divorce_lawyer().subscribe(
      (response) => {
        if (response.status === true) {
          this.top_divorce = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )
    this._crud.top_consumer_court_lawyer().subscribe(
      (response) => {
        if (response.status === true) {
          this.top_consumer_court = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )
    this._crud.top_cheque_bounce_lawyer().subscribe(
      (response) => {
        if (response.status === true) {
          this.top_cheque_bounce = response.data;
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
    this._crud.get_kanoon_advocate().subscribe(
      (response) => {
        if (response.status === true) {
          this.kanoon_list = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )
    this._crud.get_advocate_type().subscribe(
      (response) => {
        if (response.status === true) {
          this.Lawyers_types = response.data
          console.log(this.Lawyers_types);
        } else {
          this._shared.tostErrorTop('No Record Found');
        }
      }
    )
  }

  startPlaceholderRotation() {
    this.intervalId = setInterval(() => {
      this.placeholderIndex = (this.placeholderIndex + 1) % this.placeholderTexts.length;
      this.currentPlaceholder = this.placeholderTexts[this.placeholderIndex];
    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  searchPage() {
    this._router.navigate(['/home/search']);
  }

  allKanoon() {
    this._router.navigate(['/home/kanoonlist']);
  }
  kanoot_id(kanoon: any) {
    console.log(kanoon);
    this._shared.sharedData.next(kanoon)
    this._router.navigate(['/home/ipc']);
  }

  see_All(data: any) {
    this._shared.sharedData.next(data);
    this._router.navigate(['/home/changelwayerslist']);
  }

  advocate_Profile(data: any) {
    localStorage.setItem('vakilProfile', JSON.stringify(data.advId));
    this._router.navigate(['/home/advocateportfolio']);
  }

  filterAdvocate(data: any) {
    this._shared.sharedData.next(data)
    console.log(data);
    this._router.navigate(['/user/home/advocate'])
  }

  robotChat() {
    this._router.navigate(['/home/robotchat']);
  }
}
