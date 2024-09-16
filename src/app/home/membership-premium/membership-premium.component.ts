import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Checkout } from 'capacitor-razorpay';
import { RazorpayService } from 'src/app/razorpay/razorpay.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-membership-premium',
  templateUrl: './membership-premium.component.html',
  styleUrls: ['./membership-premium.component.scss'],
})
export class MembershipPremiumComponent implements OnInit {
  memebership: any;
  login: any;
  login_data: any
  memebrdata: any;
  memebership_premium: any;
  isChecked: boolean = false;

  constructor(
    private _razorpayService: RazorpayService,
    private _shared: SharedService,
    private _formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login)
    console.log(this.login_data);

    this.memebrdata = localStorage.getItem('MembershipPay')
    this.memebership_premium = JSON.parse(this.memebrdata)
    this.memebership = this.memebership_premium;
    console.log(this.memebership);
  }


  payNow(data: any) {
    console.log(data);
    const amount = data.Price1months
    this.createOrderL(amount)
  }

  createOrderL(amount: string): void {
    this.payWithrezorpay()
  }

  async payWithrezorpay() {
    const options = {
      key: 'rzp_test_YGORtbwcCRzFxD', //test
      // key: 'rzp_live_nrumEje16i8mje', //live
      amount: '1',
      description: 'vakil uncle',
      image: '',
      // order_id: 'order_Cp10EhSaf7wLbS',
      currency: 'INR',
      name: this.login_data.advocateName,
      prefill: {
        email: this.login_data.email,
        contact: this.login_data.contactNum
      },
      theme: {
        color: '#3c595d'
      }
    }

    try {
      let data = (await Checkout.open(options));
      console.log(data.response + "AcmeCorp");
      console.log(JSON.stringify(data))
    } catch (error) {
    }
  }
}
