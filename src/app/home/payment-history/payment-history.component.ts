import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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
    private _router: Router
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login)
  }
  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
  }
  loadData() {
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
