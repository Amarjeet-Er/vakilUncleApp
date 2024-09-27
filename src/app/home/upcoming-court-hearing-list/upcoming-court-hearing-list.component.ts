import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-upcoming-court-hearing-list',
  templateUrl: './upcoming-court-hearing-list.component.html',
  styleUrls: ['./upcoming-court-hearing-list.component.scss'],
})
export class UpcomingCourtHearingListComponent implements OnInit {
  login_data: any;
  case_hearing_data: any;
  case_hearing_details: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    this.initializeData();
  }

  ngOnInit() {
    this.fetchCaseHearingDetails();
  }

  private initializeData() {
    const login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(login!);

    const case_hearing_no = localStorage.getItem('CaseHearingNo');
    this.case_hearing_data = JSON.parse(case_hearing_no!);
  }

  private fetchCaseHearingDetails() {
    this._crud.get_case_hearing_law_details(this.login_data.advId, this.case_hearing_data.caseNo).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.case_hearing_details = res.data;
          const documentNames = this.case_hearing_details.documentName;
          if (documentNames) {
            this.case_hearing_details.documents = documentNames.split(',').map((name: string, index: number) => ({
              id: index + 1,
              name: name.trim()
            }));
          } else {
            this.case_hearing_details.documents = [];
          }
          console.log(this.case_hearing_details, 'details');
        }
      }
    );
  }


  AboutCase() {
    this._router.navigate(['/home/aboutcase']);
  }

  backButton() {
    this._router.navigate(['/home/upcomingcourtlist']);
    localStorage.removeItem('CaseHearingNo');
  }
}
