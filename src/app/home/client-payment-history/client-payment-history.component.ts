import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-client-payment-history',
  templateUrl: './client-payment-history.component.html',
  styleUrls: ['./client-payment-history.component.scss'],
})
export class ClientPaymentHistoryComponent implements OnInit {
  cases: any;
  filter_data: any;
  payHistory_data: any;
  payHistory: any;
  login_data: any;
  login: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login)
    console.log(this.login_data, 'history');

    this.payHistory = localStorage.getItem('Paymenthistory');
    this.payHistory_data = JSON.parse(this.payHistory)
    console.log(this.payHistory_data, 'history');
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this._crud.get_client_payment_history(this.login_data?.advId, this.payHistory_data?.id, this.payHistory_data?.caseNumber).subscribe
      ((res: any) => {
        console.log(res, 'history');
        if (res.status === true) {
          this.cases = res.data;
          this.filter_data = res.data;
        }
      }
      )
  }

  addPayment(){
    this._router.navigate(['/home/clientaddpayment'])
  }
  onBack() {
    localStorage.removeItem('Paymenthistory')
    this._router.navigate(['/home/clientduepayment'])
  }



  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.cases = this.filter_data.filter((data: any) => {
      if (data?.fee.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.extracharge.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.due.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.date.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}

