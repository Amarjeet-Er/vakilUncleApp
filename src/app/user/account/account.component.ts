import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @ViewChild('law') law !: IonModal;
  @ViewChild('terms') terms !: IonModal;
  @ViewChild('contact') contact !: IonModal;
  profile_data: any;
  login: any;
  login_data: any;
  img_url: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared:SharedService
  ) {
    this.login = localStorage.getItem('userLoginData');
    this.login_data = JSON.parse(this.login);
    this._shared.img_url.subscribe(
      (data) => {
        this.img_url = data;
      }
    );
    this._crud.get_client_profile(this.login_data.id).subscribe(
      (res: any) => {
        this.profile_data = res.data;
        console.log(this.profile_data);
        
      }
    );
  }

  ngOnInit() { }


  updatedProfile() {
    this._router.navigate(['/home/userprofile'])
  }


  logout() {
    this._router.navigate(['/login'])
  }


  // for law gruides router 
  lawRoute(loc: any) {
    this._router.navigate([loc])
    this.law.dismiss()
  }

  // for modal 
  openLaw() {
    this.law.present();
  }

  openTerms() {
    this.terms.present();
  }

  openContact() {
    this.contact.present();
  }
}
