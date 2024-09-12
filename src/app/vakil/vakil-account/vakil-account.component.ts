import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-vakil-account',
  templateUrl: './vakil-account.component.html',
  styleUrls: ['./vakil-account.component.scss'],
})
export class VakilAccountComponent  implements OnInit {
  @ViewChild('terms') terms !: IonModal;
  @ViewChild('contact') contact !: IonModal;



  constructor(
    private _router: Router
  ) { }

  ngOnInit() { }


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
}
