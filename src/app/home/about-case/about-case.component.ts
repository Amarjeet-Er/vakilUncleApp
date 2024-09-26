import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-about-case',
  templateUrl: './about-case.component.html',
  styleUrls: ['./about-case.component.scss'],
})
export class AboutCaseComponent implements OnInit {
  login_data: any;
  login: any;
  about_case: any;
  memberDetails: any;
  case_no: any;
  case_data: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this.case_no = localStorage.getItem('CaseNo');
    this.case_data = JSON.parse(this.case_no);   
  }

  ngOnInit() {
    this._crud.get_case_about_law_list(this.login_data.advId, this.case_data.caseNo).subscribe(
      (res: any) => {
        console.log(res, 'hearing');
        this.about_case = res.data;
        this.memberDetails = res.data.memberDetails;
        console.log(this.memberDetails,  'member');        
      }
    )
  }

  backButton() {
    this._router.navigate(['/home/casehearing'])
  }
}
