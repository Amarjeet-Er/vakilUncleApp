import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-today-hearing',
  templateUrl: './today-hearing.component.html',
  styleUrls: ['./today-hearing.component.scss'],
})
export class TodayHearingComponent implements OnInit {
  login_data: any;
  upcuming_court: any;
  filter_data: any;
  today_data: any;

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
        console.log(res);
        if (res.status === true) {
          const today = new Date();
          console.log(today, 'today');
          this.upcuming_court = res.data.filter((item: any) => {
            const hearingDate = new Date(item.hearingDate);

            return (
              hearingDate.getFullYear() === today.getFullYear() &&
              hearingDate.getMonth() === today.getMonth() &&
              hearingDate.getDate() === today.getDate()
            );
          });

          console.log(this.upcuming_court, 'Filtered hearings for today');
          this.filter_data = this.upcuming_court;
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
        data?.hearingDate.toString().toLowerCase().includes(filter) ||
        data?.contactNum.toString().toLowerCase().includes(filter) ||
        data?.clientName.toString().toLowerCase().includes(filter)
      );
    });
  }
}

