import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @ViewChild('law') law !: IonModal;
  @ViewChild('terms') terms !: IonModal;
  @ViewChild('contact') contact !: IonModal;


  constructor(
    private _router: Router
  ) { }

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
