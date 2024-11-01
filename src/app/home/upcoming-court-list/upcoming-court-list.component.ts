import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-upcoming-court-list',
  templateUrl: './upcoming-court-list.component.html',
  styleUrls: ['./upcoming-court-list.component.scss'],
})
export class UpcomingCourtListComponent implements OnInit {
  login_data: any;
  upcuming_court: any;
  filter_data: any;

  constructor(
    private _router: Router,
    private sharedService: SharedService,
    private crudService: CrudService,
    private _shared: SharedService,

  ) {
    const login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(login!);
  }

  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.fetchUpcomingCourtList();
    });
  }

  private fetchUpcomingCourtList(): void {
    this.crudService.get_upcoming_court_list(this.login_data.advId).subscribe(
      (res: any) => {
        console.log(res, 'dashboard');
        if (res.status) {
          this.upcuming_court = res.data;
          this.filter_data = res.data;
        } else {
          this.sharedService.tostErrorTop('Error');
        }
      },
      (error) => {
        this.sharedService.tostErrorTop('Error');
      }
    );
  }

  onUpcoming(data: any): void {
    this._shared.sharedData.next(data)
    this._router.navigate(['/home/upcominghearinglist']);
  }

  onSearch(event: any): void {
    const filter = event.target.value.toLowerCase();
    this.upcuming_court = this.filter_data.filter((data: any) => {
      return (
        data?.caseNo.toString().toLowerCase().includes(filter) ||
        data?.hearingDate.toString().toLowerCase().includes(filter) ||
        data?.clientName.toString().toLowerCase().includes(filter)
      );
    });
  }
}
