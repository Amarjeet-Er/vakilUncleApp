import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss'],
})
export class ClientPaymentComponent implements OnInit {

  searchTerm: string = '';

  payment: any;
  filter_data: any;
  login_data: any;
  login: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login)
  }

  ngOnInit() {
    this._crud.get_client_payment_list(this.login_data.advId).subscribe
      ((res: any) => {
        if (res.status === true) {
          this.payment = res.data;
          this.filter_data = res.data;
        }
      }
      )
  }



  // Function to filter the cases based on search term
  filterCases(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.payment = this.filter_data.filter((caseDetail: { name: string; caseNumber: string | any[]; }) => {
      return caseDetail.name.toLowerCase().includes(searchTerm) ||
        caseDetail.caseNumber.includes(searchTerm);
    });
  }

}