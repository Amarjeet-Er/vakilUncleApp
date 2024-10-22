import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-client-case-about',
  templateUrl: './client-case-about.component.html',
  styleUrls: ['./client-case-about.component.scss'],
})
export class ClientCaseAboutComponent  implements OnInit {
  login_data: any;
  login: any;
  about_case: any;
  memberDetails: any;
  case_no: any;
  case_data: any;
  clientName: any;
  case_number: any;


  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService,
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this._shared.sharedData.subscribe(
      (data) => {
        this.case_number = data;
        this._crud.get_case_about_law_list(this.case_number.adid, this.case_number.caseNo).subscribe(
          (res: any) => {
            console.log(res);
            this.about_case = res.data;
            this.memberDetails = res.data.memberDetails;
          }
        )
      }
    )
  }

  ngOnInit() {
    
  }



  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: string[] = [];
  selectedOption: string = '';

  filterOptions(event: any) {
    const value = event.target.value?.toLowerCase() || '';
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(value)
    );
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.filteredOptions = []; 
  }
}

