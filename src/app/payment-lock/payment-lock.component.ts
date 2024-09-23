import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-lock',
  templateUrl: './payment-lock.component.html',
  styleUrls: ['./payment-lock.component.scss'],
})
export class PaymentLockComponent implements OnInit {

  isPaymentCompleted: boolean = false; // This should be updated based on actual payment status

  // Example logic to set payment status
  checkPaymentStatus() {
    // Logic to determine payment status
    // Set isPaymentCompleted = true/false based on the payment result
  }
  constructor(
    private _router: Router
  ) {

  }

  ngOnInit() {
    this.checkPaymentStatus();
  }
  retryPayment() {
    this._router.navigate(['/vakil/home/membership'])
  }
}