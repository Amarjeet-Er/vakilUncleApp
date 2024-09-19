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
  verifyMembershipLive(vakilId: string, featurPlan: number, planType: string) {
    return this._http.get<any>(`${this.baseUrlLive}purchaseMembership?vakilId=${vakilId}&featurPlan=${featurPlan}&planType=${planType}`, {});
  }

  
  PaymentSuccessInsert(data: any) {
    return this._http.post(`https://vakiluncle.in/api/Payment`, data)
  }

  PaymentFaildInsert(data: any) {
    return this._http.post(`https://vakiluncle.in/api/Payment`, data)
  }
}
