import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-add-client-case',
  templateUrl: './add-client-case.component.html',
  styleUrls: ['./add-client-case.component.scss'],
})
export class AddClientCaseComponent implements OnInit {
  addCase_form!: FormGroup
  login: any;
  login_data: any;
  clientName: any;
  court_list: any;

  constructor(
    private _fb: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login)

    this.fetchDropdownData();
  }
  fetchDropdownData() {
    this._crud.get_new_Client(this.login_data.advId).subscribe((res: any) => { this.clientName = res.data })
    this._crud.get_court_list().subscribe((res: any) => { if (res.status === true) { this.court_list = res.data; } })
  }

  ngOnInit() {
    this.addCase_form = this._fb.group({
      vakilId: [''],
      clientId: ['', Validators.required],
      caseTitle: ['', Validators.required],
      caseno: ['', Validators.required],
      court: ['', Validators.required],
      act: ['', Validators.required],
      firdate: ['', Validators.required],
      advocatefee: ['', Validators.required],
      aboutcase: ['', Validators.required],
      fatherName: ['', Validators.required],
      membername: ['', Validators.required],
      membercontactNum: ['', Validators.required],
      memberDetail: ['', Validators.required],
      memberaddress: ['', Validators.required],
      addMembers: this._fb.array([]),
    })
  }

  get membersArray() {
    return this.addCase_form.get('addMembers') as FormArray;
  }

  addMemberControls() {
    const memberNumber = this.membersArray.length + 1;
    const memberGroup = this._fb.group({
      [`MemberName${memberNumber}`]: [''],
      [`MemberDetails${memberNumber}`]: [''],
    });
    this.membersArray.push(memberGroup);
  }

  removeMember(index: number) {
    this.membersArray.removeAt(index + 0);
  }

  onSubmit() {
    console.log(this.addCase_form.value);
    this._crud.get_case_duplicate_number(this.login_data.advId, this.addCase_form.value?.caseno).subscribe(
      (res: any) => {
        if (res.status === true) {
          this._shared.tostErrorTop('Case Number Already Exists')
        }
      }
    )
  }
}
