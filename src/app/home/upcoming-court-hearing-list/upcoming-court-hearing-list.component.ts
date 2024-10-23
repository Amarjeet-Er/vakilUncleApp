import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-upcoming-court-hearing-list',
  templateUrl: './upcoming-court-hearing-list.component.html',
  styleUrls: ['./upcoming-court-hearing-list.component.scss'],
})
export class UpcomingCourtHearingListComponent implements OnInit, OnDestroy {
  login_data: any;
  case_hearing_data: any;
  case_hearing_details: any;
  private navigationSubscription: Subscription = new Subscription;
  filter_data: any;
  hearing_id: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    this.initializeData();
    this._shared.sharedData.subscribe((res: any) => {
      this.hearing_id = res;
    });
  }

  ngOnInit() {
    // Subscribe to NavigationEnd event to fetch data on navigation change
    this.navigationSubscription = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.initializeData();  // Ensure latest data from localStorage
        this.fetchCaseHearingDetails();
      });
  }

  private initializeData() {
    const login = localStorage.getItem('vakilLoginData');
    if (login) {
      this.login_data = JSON.parse(login);
    }

    const case_hearing_no = localStorage.getItem('CaseHearingNo');
    if (case_hearing_no) {
      this.case_hearing_data = JSON.parse(case_hearing_no);
    }
  }


  private fetchCaseHearingDetails() {
    if (this.hearing_id) {
      this._crud
        .get_case_hearing_law_details(this.login_data.advId, this.hearing_id.caseNo)
        .subscribe(
          (res: any) => {
            if (res.status === true) {
              this.case_hearing_details = res.data; 
              this.filter_data = res.data; 
              this.case_hearing_details.forEach((hearing: any) => {
                if (hearing.documentName) {
                  hearing.documents = hearing.documentName
                    .split(',')
                    .map((name: string, index: number) => ({
                      id: index + 1,
                      name: name.trim(),
                    }));
                } else {
                  hearing.documents = [];
                }
              });

              console.log(this.case_hearing_details, 'details');
            }
          },
          (error) => {
            console.error('Error fetching case hearing details', error);
          }
        );
    }
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  onSearch(event: any) {
    const filter = event.target.value ? event.target.value.toLowerCase() : ''; 
    if (!filter) {
      this.case_hearing_details = [...this.filter_data];
      return;
    }

    this.case_hearing_details = this.filter_data.filter((data: any) => {
      return [
        data?.caseTitle,
        data?.clientName,
        data?.caseNo,
        data?.contactNum,
        data?.courtName,
        data?.hearingDate,
        data?.extraCharge,
        data?.chargeDetail,
        data?.documentName,
        data?.caseSummary,
      ].some(field =>
        field?.toString().toLowerCase().includes(filter)
      );
    });
  }
}

