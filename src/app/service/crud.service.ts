import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
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
  forget_password(email: string, password: any) {
    return this._http.post<any>(`${this.base_url}resetPassword?email=${email}$pass=${password}`, {});
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


  vakil_dashboard(vakilId: any) {
    return this._http.get<any>(`${this.base_url}vakilDashboard?vakilId=${vakilId}`);
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

  get_update_vakil_profile(vakilId: any) {
    return this._http.get<any>(`${this.base_url}advocateProfile?vakilId=${vakilId}`);
  }

  update_vakil_profile(data: any) {
    return this._http.post<any>(`${this.base_url}updateProfile`, data);
  }

  //premium feature
  add_publication(data: any) {
    return this._http.post<any>(`${this.base_url}addPublication`, data);
  }

  get_publication(vakilId: any) {
    return this._http.post<any>(`${this.base_url}viewPublication?vakilId=${vakilId}`, {});
  }

  add_image_banner(data: any) {
    return this._http.post<any>(`${this.base_url}addImageAndBanner`, data);
  }

  get_image_banner(vakilId: any) {
    return this._http.get<any>(`${this.base_url}imageBannerList?vakilId=${vakilId}`);
  }

  add_video(data: any) {
    return this._http.post<any>(`${this.base_url}addvideo`, data);
  }

  get_video(vakilId: any) {
    return this._http.get<any>(`${this.base_url}videoList?vakilId=${vakilId}`);
  }

  new_Client_register(data: any) {
    return this._http.post<any>(`${this.base_url}ClientRegister`, data);
  }

  get_new_Client(vakilId: any) {
    return this._http.get<any>(`${this.base_url}ClientListByVakilId?vakilId=${vakilId}`);
  }

  //end feature

  get_membership_detail() {
    return this._http.get<any>(`${this.base_url}MembershipDetail`);
  }

  get_pay_history(vakilId: any) {
    return this._http.get<any>(`${this.base_url}getPaymentHistoryByAdvocate?vakilId=${vakilId}`);
  }

  get_case_document(VakilId: any, CaseNo: any) {
    return this._http.get<any>(`${this.base_url}caseDocumentByCaseNo?vakilId=${VakilId}&caseno=${CaseNo}`);
  }

  get_total_case_list(vakilId: any) {
    return this._http.get<any>(`${this.base_url}getCaseByAdvocate?vakilId=${vakilId}`);
  }

  get_upcoming_court_list(vakilId: any) {
    return this._http.get<any>(`${this.base_url}upcomingCourtDateList?vakilId=${vakilId}`);
  }

  get_complete_court_list(vakilId: any) {
    return this._http.get<any>(`${this.base_url}completeCaseDetail?vakilId=${vakilId}`);
  }

  get_client_payment_list(vakilId: any) {
    return this._http.get<any>(`${this.base_url}clientPaymentHistoryByAdvocate?vakilId=${vakilId}`);
  }

  get_total_case_hearing_law_list(vakilId: any) {
    return this._http.get<any>(`${this.base_url}getCaseHearingDetailByAdvocate?vakilId=${vakilId}`);
  }

  get_case_hearing_law_list(vakilId: any, clientId: any) {
    return this._http.get<any>(`${this.base_url}caseHearingDetail?vakilId=${vakilId}&clientId=${clientId}`);
  }

  post_hearing_date(data: any) {
    return this._http.post<any>(`${this.base_url}addHearingDetail`, data);
  }

  get_case_about_law_list(vakilId: any, caseNo: any) {
    return this._http.get<any>(`${this.base_url}caseDetailByCaseno?vakilId=${vakilId}&caseNo=${caseNo}`);
  }

  get_case_hearing_law_details(vakilId: any, caseNo: any) {
    return this._http.get<any>(`${this.base_url}hearingDetailByCaseNo?vakilId=${vakilId}&caseNo=${caseNo}`);
  }

  get_case_duplicate_number(vakilId: any, caseNo: any) {
    return this._http.get<any>(`${this.base_url}checkDblCaseNumber?vakilId=${vakilId}&caseno=${caseNo}`)
  }
  post_add_case(data: any) {
    return this._http.post<any>(`${this.base_url}addCase`, data)
  }
  post_add_members(data: any) {
    return this._http.post<any>(`${this.base_url}addCaseMember`, data)
  }

  post_delete_member(data: any) {
    console.log(data, 'submitted');    
    return this._http.delete<any>('https://vakiluncle.in/api/removeMember', data)
  }



  //for user 
  user_registartion(data: any) {
    return this._http.post<any>(`${this.base_url}ClientRegister`, data);
  }
}
