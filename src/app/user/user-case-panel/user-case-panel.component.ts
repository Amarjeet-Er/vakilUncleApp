import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import { filter } from 'rxjs/operators';

interface Case {
  title: string;
  lawyerName: string;
  caseNumber: string;
  mobileNumber: string;
  nextDate: string;
}

@Component({
  selector: 'app-user-case-panel',
  templateUrl: './user-case-panel.component.html',
  styleUrls: ['./user-case-panel.component.scss'],
})
export class UserCasePanelComponent implements OnInit {
  cases: any;
  filter_data: any;
  login_data: any;
  login: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    this.login = localStorage.getItem('userLoginData');
    this.login_data = JSON.parse(this.login)
  }

  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    this._crud.get_client_total_case(this.login_data.id).subscribe
      ((res: any) => {
        console.log(res, 'total case');
        if (res.status === true) {
          this.cases = res.data;
          this.filter_data = res.data;
        }
      }
      )
  }


  addHearing(data: any) {
    this._shared.sharedData.next(data)
    console.log(data);
    
    this._router.navigate(['/home/clienthearinglist'])
  }

  aboutCase(data: any) {
    this._shared.sharedData.next(data);
    this._router.navigate(['/home/clientaboutcase'])
  }

  onSearch(event: any) {
    const filter = event.target.value ? event.target.value.toLowerCase() : ''; 
    if (!filter) {
      this.cases = [...this.filter_data];
      return;
    }

    this.cases = this.filter_data.filter((data: any) => {
      return [
        data?.caseTitle,
        data?.vakilName,
        data?.caseNo,
        data?.contactNum,
        data?.courtName,
        data?.act
      ].some(field =>
        field?.toString().toLowerCase().includes(filter)
      );
    });
  }
}
