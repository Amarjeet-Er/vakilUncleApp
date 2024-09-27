import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private sharedService: SharedService,
    private crudService: CrudService
  ) {
    const login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(login!);
  }

  ngOnInit(): void {
    this.fetchUpcomingCourtList();
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
    localStorage.setItem('CaseHearingNo', JSON.stringify(data));
    this.router.navigate(['/home/upcominghearinglist']);
  }

  onSearch(event: any): void {
    const filter = event.target.value.toLowerCase();
    this.upcuming_court = this.filter_data.filter((data: any) => {
      return (
        data?.caseNo.toString().toLowerCase().includes(filter) ||
        data?.hearingDate.toString().toLowerCase().includes(filter)
      );
    });
  }
}
