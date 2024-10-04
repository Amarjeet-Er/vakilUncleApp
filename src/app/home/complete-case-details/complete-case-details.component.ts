import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-complete-case-details',
  templateUrl: './complete-case-details.component.html',
  styleUrls: ['./complete-case-details.component.scss'],
})
export class CompleteCaseDetailsComponent implements OnInit {
  case_hearing_details: any;

  constructor(
    private _shared: SharedService
  ) {

  }

  ngOnInit() {
    this._shared.sharedData.subscribe(
      (res: any) => {
        console.log(res, 'case complete');
        try {
          this.case_hearing_details = res
        }
        catch (error) {
          this._shared.tostErrorTop('Error',);
        }
      },
    )
  }
}
