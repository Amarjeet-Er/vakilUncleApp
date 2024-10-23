import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-vakil-by-client-total-case',
  templateUrl: './vakil-by-client-total-case.component.html',
  styleUrls: ['./vakil-by-client-total-case.component.scss'],
})
export class VakilByClientTotalCaseComponent implements OnInit {

  cases: any;
  filter_data: any;
  clientId: any
  login_data: any;
  login: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login)
    this._shared.sharedData.subscribe(
      (res: any) => {
        this.clientId = res;
      }
    )
  }

  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    this._crud.get_total_case_list(this.login_data?.advId).subscribe(
      (res: any) => {
        if (res && res.data) {
          if (Array.isArray(res.data)) {
            const ids: string[] = [];
            res.data.forEach((item: any) => {
              if (this.clientId === item.id) {
                ids.push(item);
                this.cases = ids ;
                this.filter_data = ids ;
              }
            });
          } else {
            console.log('Expected data to be an array, but it is not.');
          }
        } else {
          console.log('No data found in response');
        }
      },
      (error) => {
        console.error('Error fetching case list:', error);
      }
    );
  }



  onSearch(event: any) {
    const filter = event.target.value ? event.target.value.toLowerCase() : '';
    if (!filter) {
      this.cases = [...this.filter_data];
      return;
    }

    this.cases = this.filter_data.filter((data: any) => {
      return [
        data?.courtName,
        data?.caseTitle,
        data?.caseNo,
        data?.hearingDate,
        data?.act
      ].some(field =>
        field?.toString().toLowerCase().includes(filter)
      );
    });
  }
}


