import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('modal') modal!: IonModal;
  loginData: any;
  caseData: any;
  caseHearingData: any;
  caseHearingList: any[] = [];
  filterData: any[] = [];
  caseHearingDetails: any;

  constructor(
    private router: Router,
    private crudService: CrudService
  ) {
    this.loadLocalData();
  }

  ngOnInit() {
    this.fetchCaseHearingList();
  }

  private loadLocalData() {
    this.loginData = this.getLocalData('vakilLoginData');
    this.caseData = this.getLocalData('CaseNo');
    this.caseHearingData = this.getLocalData('CaseHearingNo');
  }

  private getLocalData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  private fetchCaseHearingList() {
    this.crudService.get_case_hearing_law_list(this.loginData?.advId, this.caseData?.id)
      .subscribe((res: any) => {
        if (res?.data) {
          this.caseHearingList = res.data;
          this.filterData = [...this.caseHearingList];
        }
      });
  }

  aboutCase() {
    this.router.navigate(['/home/aboutcase']);
  }

  openModal(data: any) {
    this.crudService.get_case_hearing_law_details(this.loginData?.advId, data?.caseNo).subscribe(
      (res: any) => {
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
    this.modal.present();
  }

  backButtonToCaseList() {
    localStorage.removeItem('CaseNo');
    this.router.navigate(['/home/vakiltotalcase']);
  }

  dismissModal() {
    localStorage.removeItem('CaseHearingNo');
    this.modal.dismiss();
  }

  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.caseHearingList = this.filterData.filter((data: any) => {
      return data?.caseNo.toString().toLowerCase().includes(filter) ||
        data?.hearingDate.toString().toLowerCase().includes(filter);
    });
  }
}
