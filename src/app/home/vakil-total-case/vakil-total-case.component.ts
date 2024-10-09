import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-vakil-total-case',
  templateUrl: './vakil-total-case.component.html',
  styleUrls: ['./vakil-total-case.component.scss'],
})
export class VakilTotalCaseComponent implements OnInit {
  cases: any;
  filter_data: any;
  login_data: any;
  login: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login)
  }

  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    this._crud.get_total_case_list(this.login_data.advId).subscribe
      ((res: any) => {
        console.log(res, 'total case');
        
        if (res.status === true) {
          this.cases = res.data;
          this.filter_data = res.data;
        }
      }
      )
  }

  // for add case 
  addClientCase() {
    this._router.navigate(['/home/addclientcase'])
  }

  Documents(data: any) {
    this._shared.sharedData.next(data)    
    this._router.navigate(['/home/uploaddocuments'])
  }
  addHearingDate(data: any) {
    this._shared.sharedData.next(data)
    this._router.navigate(['/home/addhearingdate'])
  }
  addMember(data: any) {
    this._shared.sharedData.next(data)
    this._router.navigate(['/home/addmembers'])
  }
  aboutCase(data: any) {
    this._shared.sharedData.next(data);
    this._router.navigate(['/home/aboutcase'])
  }

  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.cases = this.filter_data.filter((data: any) => {
      if (data?.caseTitle.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.clientName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.caseNo.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.contactNum.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.courtName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.act.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}
