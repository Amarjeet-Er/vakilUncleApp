import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-total-client',
  templateUrl: './total-client.component.html',
  styleUrls: ['./total-client.component.scss'],
})
export class TotalClientComponent implements OnInit {
  detail: any
  login: any;
  login_data: any;
  clients: any;
  img_url: any;
  states: any;
  citys: any;
  court_list: any;
  Aadhar_select: any;
  filterData: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService,
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this._shared.img_url.subscribe(
      (data: any) => {
        this.img_url = data;
      }
    )
  }
  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
    this.loadData();
  }

  loadData() {
    this._crud.get_new_Client(this.login_data.advId).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status === true) {
          this.clients = res.data;
          this.filterData = res.data;
        }
      }
    )
  }

  totalcase(clientId: any) {
    console.log(clientId);
    this._shared.sharedData.next(clientId)
    this._router.navigate(['/home/vakilbyclienttotalcase'])
  }
  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.clients = this.filterData.filter((data: any) => {
      if (data?.clientName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.contactNum.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.caseNo.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}