import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-complete-case-list',
  templateUrl: './complete-case-list.component.html',
  styleUrls: ['./complete-case-list.component.scss'],
})
export class CompleteCaseListComponent implements OnInit {
  login: any;
  login_data: any;
  vId: any;
  complete_case: any;
  filter_data: any;


  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService
  ) {
    this.login = localStorage.getItem('vakilLoginData')
    this.login_data = JSON.parse(this.login)
    this.vId = this.login_data.advId;
  }

  ngOnInit() {
    this._crud.get_complete_court_list(this.vId).subscribe(
      (res: any) => {
        console.log(res, 'dashboard');
        try {
          if (res.status === true) {
            this.complete_case = res.data
            this.filter_data = res.data
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

  onDetails(data: any) {
    this._shared.sharedData.next(data)
    this._router.navigate(['/home/completecasedetails']);
  }

  onSearch(event: any): void {
    const filter = event.target.value.toLowerCase();
    this.complete_case = this.filter_data.filter((data: any) => {
      return (
        data?.clientName.toString().toLowerCase().includes(filter) ||
        data?.hearingDate.toString().toLowerCase().includes(filter)
      );
    });
  }

}
