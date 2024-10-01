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
  user_id: any;
  vakil: any;
  vakil_id: any;

  constructor(
    private _router: Router,
    private _backbtn: BackBtnService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._backbtn.back();
    this.isLogin();
  }

  isLogin() {
    // Check if vakilLoginData exists and parse it
    this.vakil = localStorage.getItem('vakilLoginData');
    this.vakil_id = this.vakil ? JSON.parse(this.vakil) : null;

    // Check if userLoginData exists and parse it
    this.user = localStorage.getItem('userLoginData');
    this.user_id = this.user ? JSON.parse(this.user) : null;

    // Log current path for debugging
    console.log(this._location.path(), 'current path');
    console.log(this.user_id?.id, 'user');
    console.log(this.vakil_id?.advId, 'vakil');

    // Conditional navigation
    if (this.vakil_id?.advId) {
      if (this._location.path() === '') {
        this._router.navigate(['/vakil/home/dashboard']);
      }
    } else if (this.user_id?.id) {
      if (this._location.path() === '') {
        this._router.navigate(['/user/home/dashboard']);
      }
    }
  }
}