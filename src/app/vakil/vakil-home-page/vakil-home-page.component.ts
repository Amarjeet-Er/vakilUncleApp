import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vakil-home-page',
  templateUrl: './vakil-home-page.component.html',
  styleUrls: ['./vakil-home-page.component.scss'],
})
export class VakilHomePageComponent implements OnInit {
  payment: any;
  payment_data: any;

  constructor(
    private _router: Router
  ) {
    this.payment = localStorage.getItem('vakilPaymentData');
    this.payment_data = JSON.parse(this.payment);
  }

  ngOnInit() { }
  newClientAdd() {
    if (this.payment_data.status === true) {
      this._router.navigate(['/vakil/home/newclientreg']);
    }
    else {
      this._router.navigate(['/home/paymentlock']);
    }
  }
}
