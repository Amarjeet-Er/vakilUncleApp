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
  members: { name: string, details: string }[] = [];

  constructor(
    private _fb: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService
  ) { }

  ngOnInit() {
    this.addCase_form = this._fb.group({
      caseTitle: ['', Validators.required],
      caseNo: ['', Validators.required],
      clientName: ['', Validators.required],
      clientMobile: ['', Validators.required],
      hearingDate: ['', Validators.required],
      ipcSection: ['', Validators.required],
      courtName: ['', Validators.required],
      aboutCase: ['', Validators.required],
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
  }
}
