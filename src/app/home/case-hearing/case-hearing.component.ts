import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-case-hearing',
  templateUrl: './case-hearing.component.html',
  styleUrls: ['./case-hearing.component.scss'],
})
export class CaseHearingComponent implements OnInit {
  @ViewChild('modal') modal!: IonModal;
  loginData: any;
  caseData: any;
  caseHearingList: any[] = [];
  filterData: any[] = [];

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService
  ) {}

  ngOnInit() {
    this.loadLocalData();

    // Reload data every time a navigation event ends
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      if (this.loginData && this.caseData) {
        this.fetchCaseHearingList();
      }
    });
  }

  private loadLocalData() {
    this.loginData = this.getLocalData('vakilLoginData');
    this.caseData = this.getLocalData('CaseNo');

    if (this.loginData && this.caseData) {
      this.fetchCaseHearingList();
    }
  }

  private getLocalData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  private fetchCaseHearingList() {
    if (!this.loginData?.advId || !this.caseData?.id) {
      console.error("Missing loginData or caseData, cannot fetch case hearing list.");
      return;
    }

    this._crud.get_case_hearing_law_list(this.loginData.advId, this.caseData.id)
      .subscribe((res: any) => {
        console.log(res);
        
        if (res?.data) {
          this.caseHearingList = res.data;
          this.filterData = [...this.caseHearingList];
        } else {
          console.warn("No data found for case hearings.");
        }
      }, (error) => {
        console.error("Error fetching case hearing list:", error);
      });
  }

  aboutCase() {
    this._router.navigate(['/home/aboutcase']);
  }

  onDetails(data: any) {
    console.log(data);
    
    localStorage.setItem('DetailsNo', JSON.stringify(data));
    this._router.navigate(['/home/casehearingdetails']);
  }

  backButtonToCaseList() {
    localStorage.removeItem('CaseNo');
    this._router.navigate(['/home/vakiltotalcase']);
  }

  onSearch(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.caseHearingList = this.filterData.filter((data: any) => {
      return data?.caseNo?.toString().toLowerCase().includes(filterValue) ||
        data?.hearingDate?.toString().toLowerCase().includes(filterValue);
    });
  }
}
