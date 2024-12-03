import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-junction',
  templateUrl: './login-junction.component.html',
  styleUrls: ['./login-junction.component.scss'],
})
export class LoginJunctionComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() { }
  vakilLogin() {
    this._router.navigate(['/loginvakil'])
    return
  }
  clientLogin() {
    this._router.navigate(['/loginclient'])
    return
  }
}