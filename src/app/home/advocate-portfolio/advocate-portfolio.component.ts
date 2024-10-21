import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import { forkJoin } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  login: any;
  login_data: any;
  profile_data: any;
  img_url: any;
  image_banner: any;
  routerSubscription: any;
  video_data: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService,
    private sanitizer: DomSanitizer
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
      banner: this._crud.get_image_banner(this.login_data),
      video: this._crud.get_video(this.login_data),
    }).subscribe(
      ({ profile, banner, video }) => {
        if (profile.status === true) {
          this.profile_data = profile.data;
          if (this.profile_data?.contactNum) {
            const contactNumStr = String(this.profile_data?.contactNum); 
            const firstPart = contactNumStr?.slice(0, 3);
            const lastPart = contactNumStr?.slice(-2);
            this.profile_data.maskedContactNum = `${firstPart}*****${lastPart}`;
          }          
        }
        if (banner.status === true) {
          this.image_banner = banner.data;
          console.log(this.image_banner, 'banner');
        }
        if (video.status === true) {
          this.video_data = video.data;
          console.log(this.video_data, 'video data');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        this._shared.tostErrorTop('Error fetching data')
      }
    );
  }

  getSafeUrl(videoUrl: string): SafeResourceUrl {
    const videoId = videoUrl.split('be/')[1] || videoUrl.split('v=')[1];
    const url = `https://www.youtube.com/embed/${videoId.split('?')[0]}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
