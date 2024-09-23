import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazorpayService {

  constructor(
    private _http: HttpClient
  ) { }

  private baseUrlLive = 'https://vakiluncle.in/api/';


  createOrderLive(amount: any) {
    return this._http.get<any>(`${this.baseUrlLive}generateOrderId?amount=${amount}`);
  }

  verifyMembershipLive(payment_Id: string, Order_Id: number, signature: string) {
    return this._http.post<any>(`${this.baseUrlLive}verifyPayment?payment_Id=${payment_Id}&Order_Id=${Order_Id}&signature=${signature}`, {});
  }

  PaymentSuccessInsert(data: any) {
    return this._http.post(`https://vakilUncle.in/api/addVakilPaymentHistroy`, data)
  }

  PaymentFaildInsert(data: any) {
    return this._http.post(`https://vakilUncle.in/api/addVakilPaymentHistroy`, data)
  }
}
