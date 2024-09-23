import { Component, OnInit } from '@angular/core';
import { Checkout } from 'capacitor-razorpay';
import { LazorpayService } from 'src/app/service/lazorpay.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-membership-premium',
  templateUrl: './membership-premium.component.html',
  styleUrls: ['./membership-premium.component.scss'],
})
export class MembershipPremiumComponent implements OnInit {
  memebership: any;
  loginData: any;
  membershipPremium: any;
  isChecked: boolean = false;
  paymentData: any;
  membershipData: any;
  login: any;
  subscription_data: any;
  orderId: any;
  payData: any;

  constructor(
    private razorpayService: LazorpayService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.login = localStorage.getItem('vakilLoginData');
    this.loginData = JSON.parse(this.login);
    console.log(this.loginData);

    this.membershipData = localStorage.getItem('MembershipPay');
    this.membershipPremium = JSON.parse(this.membershipData);
    this.memebership = this.membershipPremium;
    console.log(this.memebership);
  }

  payNow(data: any) {
    this.subscription_data = data
    const amount = data.newPrice
    this.createOrderL(amount)
  }

  createOrderL(amount: string): void {
    this.razorpayService.createOrderLive(amount).subscribe(
      (response: any) => {
        console.log(response, 'order');
        this.orderId = response.data.Attributes.id;
        console.log(this.orderId, 'order id');
        this.payWithRazorpay(response.data.Attributes.id, response.data.Attributes.amount)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async payWithRazorpay(order_id: string, amount: any) {
    const options = {
      key: 'rzp_test_YGORtbwcCRzFxD', //test
      // key: 'rzp_live_nrumEje16i8mje', //live
      amount: amount,
      description: 'Vakil Uncle',
      image: 'https://vakil',
      order_id: order_id,
      currency: 'INR',
      name: 'Vakil Uncle',
      prefill: {
        name: this.loginData.advocateName,
        email: this.loginData.email,
        contact: this.loginData.contactNum
      },
      theme: {
        color: '#0f4290'
      }
    };

    try {
      let data = (await Checkout.open(options));
      console.log(data.response);
      this.payData = data.response
      this.verifyPaymentLive(data.response)
    } catch (error) {
      console.log(error);
      this.PaymentFaildInsert(error)

    }
  }

  verifyPaymentLive(data: any) {
    console.log(data);
    const payment_id = data.razorpay_payment_id;
    const order_id = data.razorpay_order_id;
    const razorpay_signature = data.razorpay_signature;

    this.razorpayService.verifyMembershipLive(payment_id, order_id, razorpay_signature)
      .subscribe(
        (response) => {
          console.log(response);
          this.PaymentSuccess()
        },

        (error) => {
          console.error(error);
          alert('Payment Faild Try again')

        }
      );
  }

  PaymentFaildInsert(error: any) {
    const data = {
      vakilId: this.loginData.advId,
      OrderId: this.payData.razorpay_order_id,
      PaymentId: this.payData.razorpay_payment_id,
      // SignatureId: this.payData.razorpay_signature,
      featureId: this.memebership.id,
      price: this.memebership.newPrice,
      paymentStatus: 0,
      paymentDescription: error.reason || 'Unknown error',
      paymentMode: 'through UPI',
    };

    console.log(data, 'Failed payment data amar');
    this.razorpayService.PaymentFaildInsert(data).subscribe(
      (res: any) => {
        this.sharedService.tostErrorTop(res);
      }
    );
  }

  PaymentSuccess() {
    const data = {
      vakilId: this.loginData.advId,
      OrderId: this.payData.razorpay_order_id,
      PaymentId: this.payData.razorpay_payment_id,
      // SignatureId: this.payData.razorpay_signature,
      featureId: this.memebership.id,
      price: this.memebership.newPrice,
      paymentStatus: 1,
      paymentMode: 'through UPI',
    };

    console.log(data, 'Successful payment data');
    this.razorpayService.PaymentSuccessInsert(data).subscribe(
      (res: any) => {
        this.sharedService.tostSuccessTop('Payment Successful');
      },
      (error) => {
        console.error('Success callback error:', error);
        this.sharedService.tostErrorTop('Failed to record payment success.');
      }
    );
  }
}
