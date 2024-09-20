import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
  }

  async getDetailedLocation(lat: number, lon: number) {
    const response = await fetch(
      // `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    return response.json();
  }







  base_url: string = ''

  constructor(
    private _shared: SharedService,
    private _http: HttpClient
  ) {

    this._shared.base_url.subscribe(
      (res: any) => {
        this.base_url = res
      }
    )

  }

  //forgot password
  verify_email(email: string) {
    return this._http.post<any>(`${this.base_url}verifyEmail?email=${email}`, {});
  }

  // for vakil 
  login(data: any) {
    return this._http.post<any>(`${this.base_url}login`, data);
  }
  otp_send(email: string) {
    return this._http.get<any>(`${this.base_url}SendOTP?email=${email}&name=ama`);
  }

  get_state() {
    return this._http.get<any>(`${this.base_url}statelist`);
  }

  vakil_registartion(data: any) {
    return this._http.post<any>(`${this.base_url}VakilRegister`, data);
  }

  get_city(id: any) {
    return this._http.get<any>(`${this.base_url}citylist/${id}`);
  }

  get_court_list() {
    return this._http.get<any>(`${this.base_url}courtlist`);
  }
  get_advocate_type() {
    return this._http.get<any>(`${this.base_url}advocatetypelist`);
  }

  update_vakil_profile(data: any) {
    return this._http.post<any>(`${this.base_url}updateProfile`, data);
  }
  add_publication(data: any) {
    return this._http.post<any>(`${this.base_url}addPublication`, data);
  }
  get_publication(vakilId: any) {
    return this._http.post<any>(`${this.base_url}viewPublication?vakilId=${vakilId}`, {});
  }

  new_Client_register(data: any) {
    return this._http.post<any>(`${this.base_url}ClientRegister`, data);
  }

  get_ClientListByVakilId(vakilId: any) {
    return this._http.get<any>(`${this.base_url}ClientListByVakilId?vakilId=${vakilId}`);
  }

  get_membership_detail() {
    return this._http.get<any>(`${this.base_url}MembershipDetail`);
  }

  get_pay_history(vakilId: any) {
    return this._http.get<any>(`${this.base_url}getPaymentHistoryByAdvocate?vakilId=${vakilId}`);
  }

  vakil_dashboard(vakilId: any) {
    return this._http.get<any>(`${this.base_url}vakilDashboard?vakilId=${vakilId}`);
  }

  //for user 
  user_registartion(data: any) {
    return this._http.post<any>(`${this.base_url}ClientRegister`, data);
  }
}
