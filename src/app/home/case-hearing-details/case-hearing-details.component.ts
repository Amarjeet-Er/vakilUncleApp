import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-case-hearing-details',
  templateUrl: './case-hearing-details.component.html',
  styleUrls: ['./case-hearing-details.component.scss'],
})
export class CaseHearingDetailsComponent implements OnInit {
  loginData: any;
  caseData: any;
  caseHearingDetails: any;
  caseDetails: any;

  constructor(
    private _router: Router,
    private crudService: CrudService,
    private _shared: SharedService
  ) {
    this.loadLocalData();
  }
  private loadLocalData() {
    this.loginData = this.getLocalData('vakilLoginData');
    this.caseData = this.getLocalData('DetailsNo');
  }

  private getLocalData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  ngOnInit() {
    this.crudService.get_case_hearing_law_details(this.loginData?.advId, this.caseData?.caseNo).subscribe(
      (res: any) => {
        console.log(res , 'details');
        
        if (res.status === true) {
          this.caseHearingDetails = res.data;
          const documentNames = this.caseHearingDetails.documentName;
          if (documentNames) {
            this.caseHearingDetails.documents = documentNames.split(',').map((name: string, index: number) => ({
              id: index + 1,
              name: name.trim()
            }));
          } else {
            this.caseHearingDetails.documents = [];
          }
        }
      }
    );
  }

  backButtonToCaseList() {
    localStorage.removeItem('DetailsNo');
    this._router.navigate(['/home/casehearing']);
  }
}
