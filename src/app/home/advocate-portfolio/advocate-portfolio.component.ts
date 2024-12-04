import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-advocate-portfolio',
  templateUrl: './advocate-portfolio.component.html',
  styleUrls: ['./advocate-portfolio.component.scss'],
})
export class AdvocatePortfolioComponent implements OnInit {

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
  awards_list: any;
  achievement_list: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService,
    private _fb: FormBuilder,
    private alertController: AlertController

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
      award: this._crud.get_rewards(this.login_data),
      achievement: this._crud.get_achievement(this.login_data),
    }).subscribe(
      ({ profile, banner, video, review, award, achievement }) => {
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
        if (award.status === true) {
          this.awards_list = award.data;
          console.log(this.awards_list, 'award data');
        }
        if (achievement.status === true) {
          this.achievement_list = achievement.data;
          console.log(this.achievement_list, 'achivement data');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        this._shared.tostErrorTop(error)
      }
    );
  }
  async onVideo(video: any) {
    if (this.user_id?.id) {
      console.log(video?.videoUrl, 'video');
      this._shared.sharedData.next(video?.videoUrl)
      this._router.navigate(['/home/videoplay'])
    }  else {
      const alert = await this.alertController.create({
        header: 'Login Required',
        message: 'You need to login to use this feature. Please login or create new account.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('User chose No');
            }
          },
          {
            text: 'Login',
            handler: () => {
              this._router.navigate(['/loginclient']);
            }
          }
        ]
      });
      await alert.present();
    }
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

  async openEnquiry() {
    if (this.user_id?.id) {
      localStorage.setItem('vakilId', JSON.stringify(this.login_data));
      this._router.navigate(['/home/clientwithenquiry']);
    } else {
      const alert = await this.alertController.create({
        header: 'Login Required',
        message: 'You need to login to use this feature. Please login or create new account.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('User chose No');
            }
          },
          {
            text: 'Login',
            handler: () => {
              this._router.navigate(['/loginclient']);
            }
          }
        ]
      });
      await alert.present();
    }
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
        clientId: this.user_id?.id,
        vakilId: this.login_data,
      };
      console.log('Review submitted:', data);
      this._crud.add_review(data).subscribe(
        async (response: any) => {
          if (response.status === true) {
            console.log('Review added:', response);
            this._shared.tostSuccessTop(response?.message)
            this.resetForm();
          }
          else {
            const alert = await this.alertController.create({
              header: 'Login Required',
              message: 'You need to login to use this feature. Please login or create new account.',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                    console.log('User chose No');
                  }
                },
                {
                  text: 'Login',
                  handler: () => {
                    this._router.navigate(['/loginclient']);
                  }
                }
              ]
            });
            await alert.present();
          }
        },
        (error: any) => {
          console.error('Error adding review:', error);
          this._shared.tostErrorTop(error)
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

  getFisrtName(name: string) {
    return name.slice(0, 1)
  }
}
