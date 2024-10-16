import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post<any>(`${this.base_url}login`, data, { headers: headers });
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

  get_plan_details(vakilId: any) {
    return this._http.get<any>(`${this.base_url}GetVakilPlanDetail?vakilId=${vakilId}`);
  }

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
  post_upload_docs(data: any) {
    return this._http.post<any>(`${this.base_url}uploadCaseDocument`, data)
  }

  post_delete_members(caseNo: any, memberId: any, vakilId: any, clientId: any) {
    return this._http.delete<any>(`${this.base_url}removeMember?caseNum=${caseNo
      }&memId=${memberId}&vakilId=${vakilId}&clientId=${clientId}`
    );
  }
  get_vakil_chat_list(vakilId: any) {
    return this._http.get<any>(`${this.base_url}vakilChatList?vakilId=${vakilId}`);
  }




  //for user 
  user_registartion(data: any) {
    return this._http.post<any>(`${this.base_url}ClientRegister`, data);
  }

  get_search_advocate(search: string) {
    return this._http.get<any>(`${this.base_url}searchAdvocate?userSearchInp=${search}`);
  }
  get_banner_slide() {
    return this._http.get<any>(`${this.base_url}BannerAdvertisement`);
  }
  get_top_advocated() {
    return this._http.get<any>(`${this.base_url}topAdvocateList`);
  }
  get_city_list() {
    return this._http.get<any>(`${this.base_url}allCityList`);
  }
  post_ask_free_question(data: any) {
    return this._http.post<any>(`${this.base_url}askFreeLegalQuestion`, data);
  }
  get_client_profile(clientId: any) {
    return this._http.get<any>(`${this.base_url}GetClientById?Id=${clientId}`);
  }
  client_profile_update(data: any) {
    return this._http.post<any>(`${this.base_url}updateClientProfile`, data);
  }
  get_client_total_case(clientId: any) {
    return this._http.get<any>(`${this.base_url}getClientCase?clientId=${clientId}`);
  }
  get_nearest_lawyer(clientId: any) {
    return this._http.get<any>(`${this.base_url}nearestLawyer?clientId=${clientId}`);
  }
  get_client_chat_list(clientId: any) {
    return this._http.get<any>(`${this.base_url}clientChatList?clientId=${clientId}`);
  }
  post_filter_advocate(data: any) {
    console.log(data);
    return this._http.post<any>(`${this.base_url}filterAdvocateData`, data);
  }

  post_chatting_vakil_and_client(senderId: any, recieverId: any, sendby: any) {
    return this._http.get<any>(`${this.base_url}chat?senderId=${senderId}&recieverId=${recieverId}&sendby=${sendby}`);
  }
  getWebSocketUrl(): Observable<any> {
    return this._http.get<any>('https://vakiluncle.in/api/chat?senderId=1&recieverId=1&sendby=Client');  // Replace with your actual API endpoint
  }
}