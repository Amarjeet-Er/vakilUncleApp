import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @ViewChild('help') help !: IonModal;
  @ViewChild('terms') terms !: IonModal;
  @ViewChild('contact') contact !: IonModal;
  profile_data: any;
  login: any;
  login_data: any;
  img_url: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService,
    private alertController:AlertController
  ) {
    this.login = localStorage.getItem('userLoginData');
    this.login_data = JSON.parse(this.login);
    this._shared.img_url.subscribe(
      (data) => {
        this.img_url = data;
      }
    );
  }

  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
  }
  loadData() {
    this._crud.get_client_profile(this.login_data.id).subscribe(
      (res: any) => {
        this.profile_data = res.data;
        console.log(this.profile_data);
      }
    );
  }


  // updatedProfile() {
  //   this._router.navigate(['/home/userprofile'])
  // }

  async updatedProfile() {
    if (this.login_data?.id) {
      this._router.navigate(['/home/userprofile']);
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
  }
  termsConditions() {
    this.terms.dismiss();
    this._router.navigate(['/home/vakiltermsandconditions'])
  }

  privacyPolicy() {
    this.terms.dismiss();
    this._router.navigate(['/home/vakilprivacypolicy'])
  }

  logout() {
    this._router.navigate(['/loginclient'])
  }

  openTerms() {
    this.terms.present();
  }

}
