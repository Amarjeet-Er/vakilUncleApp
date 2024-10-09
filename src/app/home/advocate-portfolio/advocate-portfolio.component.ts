import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-advocate-portfolio',
  templateUrl: './advocate-portfolio.component.html',
  styleUrls: ['./advocate-portfolio.component.scss'],
})
export class AdvocatePortfolioComponent implements OnInit {

  awards = [
    { name: 'Legal Era Awards' },
    { name: 'Forbes India Legal Powerlist' },
    { name: 'India Business Law Journal (IBLJ) Awards' },
    { name: 'Bar Council of India Awards' },
    { name: 'Society of Indian Law Firms (SILF) Awards' },
    { name: 'The Legal 500 India Awards' }
  ]

  specializations = [
    { name: 'Family Lawyer' },
    { name: 'Criminal Lawyer' },
    { name: 'Domestic Violence' },
    { name: 'Corporate Lawyer' }
  ]

  videos = [
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

  login: any;
  login_data: any;
  profile_data: any;
  img_url: any;
  image_banner: any;
  routerSubscription: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService,
  ) {
    this.login = localStorage.getItem('vakilProfile');
    this.login_data = JSON.parse(this.login);

    this._shared.img_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
  }
  ngOnInit() {
    this.routerSubscription = this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    forkJoin({
      profile: this._crud.get_update_vakil_profile(this.login_data),
      banner: this._crud.get_image_banner(this.login_data)
    }).subscribe(
      ({ profile, banner }) => {
        if (profile.status === true) {
          this.profile_data = profile.data;
          console.log(this.profile_data, 'profile');
        }
        if (banner.status === true) {
          this.image_banner = banner.data;
          console.log(this.image_banner, 'banner');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        this._shared.tostErrorTop('Error fetching data')
      }
    );
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  onBack() {
    localStorage.removeItem('vakilProfile');
    this._router.navigate(['/user/home']);
  }
  
  makeCall(phoneNumber: string) {
    const telLink = `tel:${phoneNumber}`;
    window.location.href = telLink;
  }

  chatWithLawyer() {
    this._router.navigate(['/home/chat']);
  }
}
