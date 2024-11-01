import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-recent-client-list',
  templateUrl: './recent-client-list.component.html',
  styleUrls: ['./recent-client-list.component.scss'],
})
export class RecentClientListComponent implements OnInit {
  login_data: any;
  filter_data: any;
  recent_client: any;
  img_url: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    const login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(login!);

    this._shared.img_url.subscribe(
      (img_url) => {
        this.img_url = img_url;
      }
    )
  }

  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
  }

  private loadData(): void {
    this._crud.get_new_Client(this.login_data.advId).subscribe(
      (res: any) => {
        console.log(res, 'dashboard');
        try {
          if (res.status === true) {
            this.recent_client = res.data;
            this.filter_data = res.data;
          } else {
            this._shared.tostErrorTop('Error',);
          }
        }
        catch (error) {
          this._shared.tostErrorTop('Error',);
        }
      },
    )
  }

  onSearch(event: any): void {
    const filter = event.target.value.toLowerCase();
    this.recent_client = this.filter_data.filter((data: any) => {
      return (
        data?.clientName.toString().toLowerCase().includes(filter) ||
        data?.caseNo.toString().toLowerCase().includes(filter)
      );
    });
  }
}