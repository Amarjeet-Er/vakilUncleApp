import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import { forkJoin } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  reviewForm!: FormGroup;
  rating: number = 0;
  user_id: any;
  user: any;
  review_list: any;
  avg_total_review: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService,
    private sanitizer: DomSanitizer,
    private _fb: FormBuilder
  ) {
    this.login = localStorage.getItem('vakilProfile');
    this.login_data = JSON.parse(this.login);

    this.user = localStorage.getItem('userLoginData');
    this.user_id = JSON.parse(this.user);

    this._shared.img_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )

    this._crud.get_review_list(this.login_data).subscribe(
      (response) => {
        if (response.status === true) {
          this.avg_total_review = response.data[0];
          console.log(this.avg_total_review, 'review data');

        }
      }
    )
  }
  ngOnInit() {
    this.reviewForm = this._fb.group({
      rating: [null, Validators.required],
      review: ['', Validators.required],
    });

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
      review: this._crud.get_review_list(this.login_data),
    }).subscribe(
      ({ profile, banner, video, review }) => {
        if (profile.status === true) {
          this.profile_data = profile.data;
          console.log(this.profile_data, 'profile');

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
        if (review.status === true) {
          this.review_list = review.data;
          console.log(this.review_list, 'reating data');
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

  onStarClick(value: number) {
    this.rating = value;
    this.reviewForm.patchValue({ rating: value });
  }


  onSubmit() {
    if (this.reviewForm.valid) {
      const review = this.reviewForm.value;
      const data = {
        review: review.review,
        rating: review.rating,
        clientId: this.login_data,
        vakilId: this.user_id?.id
      };
      console.log('Review submitted:', data);
      this._crud.add_review(data).subscribe(
        (response: any) => {
          console.log('Review added:', response);
          this._shared.tostSuccessTop('Success Review')
          this.resetForm();
        },
        (error: any) => {
          console.error('Error adding review:', error);
          this._shared.tostErrorTop('Not add review')
        }
      )
    } else {
      this._shared.tostErrorTop('Please fill out the review and select a rating.');
    }
  }

  resetForm() {
    this.reviewForm.reset();
    this.rating = 0;
  }

}
