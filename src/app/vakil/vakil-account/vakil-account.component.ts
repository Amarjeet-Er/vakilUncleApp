import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-vakil-account',
  templateUrl: './vakil-account.component.html',
  styleUrls: ['./vakil-account.component.scss'],
})
export class VakilAccountComponent implements OnInit {
  @ViewChild('terms') terms !: IonModal;
  @ViewChild('contact') contact !: IonModal;
  @ViewChild('help') help !: IonModal;
  profile_data: any;
  login: any;
  login_data: any
  img_url: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService,
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this._shared.img_url.subscribe(
      (data: any) => {
        this.img_url = data
      }
    )
  }

  ngOnInit() {
    this._crud.get_update_vakil_profile(this.login_data.advId).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.profile_data = res.data;
        }
      }
    );
  }


  updatedProfile() {
    this._router.navigate(['/home/vakilprofile'])
  }


  logout() {
    this._router.navigate(['/login'])
  }


  // for modal 
  openTerms() {
    this.terms.present();
  }

  openContact() {
    this.contact.present();
  }

  openHelp() {
    this.help.present();
  }
}
