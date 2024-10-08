import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vakil-home-page',
  templateUrl: './vakil-home-page.component.html',
  styleUrls: ['./vakil-home-page.component.scss'],
})
export class VakilHomePageComponent implements OnInit {
  login: any;
  login_data: any;

  constructor(
    private _router: Router
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);
  }

  ngOnInit() { }
  newClientAdd() {
    this._router.navigate(['/home/totalclientlist']);
  }
}
