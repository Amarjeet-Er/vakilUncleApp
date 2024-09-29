import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackBtnService } from './service/back-btn.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: any;
  user_id: any
  vakil: any;
  vakil_id: any;
  
 
  constructor(
    private _router: Router,
    private _backbtn: BackBtnService,
    private _location: Location,
  ) {

  }
  ngOnInit(): void {
    this._backbtn.back();
    this.isLogin()
  }

  isLogin() {
    this.vakil = localStorage.getItem('vakilLoginData');
    this.vakil_id = JSON.parse(this.vakil);

    // this.user = localStorage.getItem('userLoginData');
    // this.user_id = JSON.parse(this.user);


    if (this.vakil_id.advId) {
      if (this._location.path() == '') {
        this._router.navigate(['/vakil/home/dashboard'])
      }
      else {
      }
    }
    // if (this.user_id.userId) {
    //   if (this._location.path() == '') {
    //     this._router.navigate(['/user/home/dashboard'])
    //   }
    //   else {
    //   }
    // }
  }
}