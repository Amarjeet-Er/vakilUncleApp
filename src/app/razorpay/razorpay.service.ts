import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  constructor() { }

  // createOrderLocal(amount: string): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/razorpay/order`, { amount });
  // }


  // verifyOrderLocal(order_id: string, payment_id: string, razorpay_signature: string) {
  //   return this.http.post<any>(`${this.baseUrl}/verifyOrder`, { order_id, payment_id }, {
  //     headers: {
  //       'x-razorpay-signature': razorpay_signature
  //     }
  //   });
  // }

}
