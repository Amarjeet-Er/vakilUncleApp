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

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    this.initializeData();
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
    // Ensure data exists before making the API call
    if (this.login_data && this.case_hearing_data) {
      this._crud.get_case_hearing_law_details(this.login_data.advId, this.case_hearing_data.caseNo).subscribe(
        (res: any) => {
          if (res.status === true) {
            this.case_hearing_details = res.data;
            const documentNames = this.case_hearing_details.documentName;
            if (documentNames) {
              this.case_hearing_details.documents = documentNames.split(',').map((name: string, index: number) => ({
                id: index + 1,
                name: name.trim(),
              }));
            } else {
              this.case_hearing_details.documents = [];
            }
            console.log(this.case_hearing_details, 'details');
          }
        },
        (error) => {
          console.error('Error fetching case hearing details', error);
        }
      );
    }
  }

  backButton() {
    this._router.navigate(['/home/upcomingcourtlist']);
    localStorage.removeItem('CaseHearingNo');
  }

  ngOnDestroy() {
    // Unsubscribe from navigation events to avoid memory leaks
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
