import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
})
export class PaymentHistoryComponent implements OnInit {
  login: any;
  login_data: any;
  pay_history: any;
  constructor(
    private _crud: CrudService,
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login)
  }

  ngOnInit() {
    this._crud.get_pay_history(this.login_data.advId).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status === true) {
          this.pay_history = res.data
          console.log(this.pay_history, 'payment');
        }
      }
    )
  }
}
