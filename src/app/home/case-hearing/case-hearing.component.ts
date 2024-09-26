import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-case-hearing',
  templateUrl: './case-hearing.component.html',
  styleUrls: ['./case-hearing.component.scss'],
})
export class CaseHearingComponent implements OnInit {
  @ViewChild('modal') modal !: IonModal;
  panelOpenState = false;

  login_data: any;
  login: any;
  case_hearing: any;
  filter_data: any;
  clientId: any;
  case_data: any;
  case_no: any;
  case_hearing_no: any;
  case_hearing_data: any;
  case_hearing_details: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this.case_no = localStorage.getItem('CaseNo');
    this.case_data = JSON.parse(this.case_no);

    this.case_hearing_no = localStorage.getItem('CaseHearingNo');
    this.case_hearing_data = JSON.parse(this.case_hearing_no);
  }

  ngOnInit() {
    this._crud.get_case_hearing_law_list(this.login_data.advId, this.case_data.id).subscribe(
      (res: any) => {
        console.log(res, 'hearing');
        this.case_hearing = res.data;
        this.filter_data = res.data;
        console.log(this.case_hearing);
      }
    )
    this._crud.get_case_hearing_law_details(this.login_data.advId, this.case_hearing_data.caseNo).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.case_hearing_details = res.data;
        }
      }
    )
  }

  // for about case button 
  AboutCase() {
    this._router.navigate(['/home/aboutcase'])
  }

  openModal(data: any) {
    console.log(data);
    localStorage.setItem('CaseHearingNo', JSON.stringify(data))
    this.modal.present()
  }

  backButton1() {
    localStorage.removeItem('CaseNo');
    this._router.navigate(['/home/vakiltotalcase'])
  }
  backButton() {
    localStorage.removeItem('CaseHearingNo');
    this.modal.dismiss();
  }

  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.case_hearing = this.filter_data.filter((data: any) => {
      if (data?.caseNo.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.hearingDate.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}
