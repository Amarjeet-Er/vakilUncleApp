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
    console.log(data);
    const amount = (data.newPrice * 100).toString();
    this.payWithRazorpay(amount, data.id);
  }

  async payWithRazorpay(amount: string, id: any) {
    const options = {
      key: 'rzp_test_YGORtbwcCRzFxD', // Test key
      amount: amount,
      orderId: id,
      description: '',
      image: 'https://vakil.in',
      currency: 'INR',
      name: this.loginData.advocateName,
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
      let response = (await Checkout.open(options));
      console.log(response.response, 'res');
      this.paymentData = response;
      this.verifyPayment(this.memebership);
    } catch (error) {
      console.error('Payment error:', error);
      this.handlePaymentFailure(error);
    }
  }

  verifyPayment(data: any) {
    console.log(data, 'id base');
    const Id = data.id;
    const planType = data.planType;

    this.razorpayService.verifyMembershipLive(this.loginData.advId, Id, planType)
      .subscribe(
        (response) => {
          console.log(response, 'Verification response');
          if (response.status) {
            this.handlePaymentSuccess();
          } else {
            alert('Payment verification failed, please try again.');
            this.handlePaymentFailure(response);
          }
        },
        (error) => {
          console.error('Verification error:', error);
          alert('Payment verification failed, please try again.');
        }
      );
  }

  handlePaymentFailure(error: any) {
    const data = {
      Name: this.loginData.advocateName,
      MobileNo: this.loginData.contactNum,
      EmailId: this.loginData.email,
      UserId: this.loginData.advId,
      OrderId: this.paymentData?.metadata?.order_id,
      PaymentId: this.paymentData?.metadata?.payment_id,
      PlanId: this.memebership.id,
      Price: this.memebership.newPrice,
      Status: 'Failed',
      PayFailedReason: error.reason || 'Unknown error',
      PaymentMode: 'through UPI',
    };

    console.log(data, 'Failed payment data amar');
    this.razorpayService.PaymentFaildInsert(data).subscribe(
      (res: any) => {
        this.sharedService.tostErrorTop(res);
      }
    );
  }

  handlePaymentSuccess() {
    const data = {
      Name: this.loginData.advocateName,
      MobileNo: this.loginData.contactNum,
      EmailId: this.loginData.email,
      UserId: this.loginData.advId,
      OrderId: this.paymentData.razorpay_order_id,
      PaymentId: this.paymentData.razorpay_payment_id,
      PlanId: this.memebership.id,
      Price: this.memebership.newPrice,
      Status: 'Success',
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
