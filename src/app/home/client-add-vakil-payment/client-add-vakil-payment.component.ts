import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-client-add-vakil-payment',
  templateUrl: './client-add-vakil-payment.component.html',
  styleUrls: ['./client-add-vakil-payment.component.scss'],
})
export class ClientAddVakilPaymentComponent implements OnInit {
  achievement_form!: FormGroup;
  login: any;
  login_data: any;
  view_achivement: any;
  img_url: any;
  filter_data: any;
  payHistory_data: any;
  payHistory: any;
  dueAmount: any;

  constructor(
    private formBuilder: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService,
    private _router: Router
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);
    console.log(this.login_data, 'history');

    this.payHistory = localStorage.getItem('Paymenthistory');
    this.payHistory_data = JSON.parse(this.payHistory);
    console.log(this.payHistory_data, 'history');

    this._shared.img_url.subscribe((data: any) => {
      this.img_url = data;
    });
  }

  ngOnInit() {
    this.achievement_form = this.formBuilder.group({
      totalfee: [this.payHistory_data?.fee],
      extracharge: [this.payHistory_data?.extracharge],
      due: [this.payHistory_data?.due],
      ClientPay: ['', [Validators.required]],
    });

    this.achievement_form.get('ClientPay')?.valueChanges.subscribe(value => {
      this.calculateDue(value);
    });
  }

  calculateDue(payment: string): void {
    const paymentValue = parseFloat(payment);
    if (paymentValue && paymentValue <= this.payHistory_data?.due) {
      this.dueAmount = this.payHistory_data?.due - paymentValue;
      console.log(this.dueAmount < 0 ? 0 : this.dueAmount, 'dueAmount');
    } else if (paymentValue > this.payHistory_data?.due) {
      this.achievement_form.get('ClientPay')?.setValue(this.payHistory_data?.due);
    }
  }

  onSubmit() {
    console.log(this.achievement_form.value);
    console.log(this.dueAmount < 0 ? 0 : this.dueAmount, 'dueAmount');

    const formdata = new FormData();
    formdata.append('vakilId', this.login_data.advId)
    formdata.append('clientId', this.payHistory_data.id)
    formdata.append('caseNumber', this.payHistory_data.caseNumber)
    formdata.append('ClientPay', this.achievement_form.get('ClientPay')?.value)
    formdata.append('due', this.dueAmount < 0 ? 0 : this.dueAmount)
    if (this.achievement_form.valid) {
      this._crud.add_payment(formdata).subscribe((res: any) => {
        console.log(res);
        if (res.status === true) {
          this._shared.tostSuccessTop('Add Success');
          this._crud.get_achievement(this.login_data.advId).subscribe(
            (res: any) => {
              console.log(res, 'response');
              this.view_achivement = res.data;
            },
          )
          this.achievement_form.reset();
        }
        else {
          this._shared.tostErrorTop('Not Add');
        }
      },
        (error: any) => {
          console.log(error);
          this._shared.tostErrorTop('Not Add');
        }
      );
    }
    else {
      this._shared.tostErrorTop('Please fill all the fields');
    }
  }

  backButton() {
    this._router.navigate(['/home/clientpaymenthistory'])
  }

  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.view_achivement = this.filter_data.filter((data: any) =>
      data.title.toLowerCase().includes(filter) ||
      data.desc.toLowerCase().includes(filter)
    );
  }
}
