import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  cases: any[] = [];
  login_data: any;
  login: any;

  constructor(
    private _shared: SharedService,
    private _crud: CrudService,
    private _router: Router,
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
        if (res.status === true) {
          this.cases = res.data;
        }
      }
      )
  }
}