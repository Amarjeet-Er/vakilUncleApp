import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-add-hearing-date',
  templateUrl: './add-hearing-date.component.html',
  styleUrls: ['./add-hearing-date.component.scss'],
})
export class AddHearingDateComponent implements OnInit {
  caseForm!: FormGroup;
  loginData: any;
  caseData: any;

  constructor(private fb: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService,
    private _router: Router,
  ) {
    this.loadLocalData();
  }

  ngOnInit() {
    this.caseForm = this.fb.group({
      hearingDate: ['', Validators.required],
      extracharge: ['', Validators.required],
      chargeDetail: ['', Validators.required],
      documentName: ['', Validators.required],
    });
  }
  private loadLocalData() {
    this.loginData = this.getLocalData('vakilLoginData');
    this.caseData = this.getLocalData('CaseNo');
  }

  private getLocalData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  onSubmit() {
    const formUpdate = new FormData();
    formUpdate.append('vakilId', this.loginData.advId);
    formUpdate.append('clientId', this.caseData.id);
    formUpdate.append('caseno', this.caseData.caseNo);
    formUpdate.append('hearingDate', this.caseForm.get('hearingDate')?.value);
    formUpdate.append('extracharge', this.caseForm.get('extracharge')?.value);
    formUpdate.append('chargeDetail', this.caseForm.get('chargeDetail')?.value);
    formUpdate.append('documentName', this.caseForm.get('documentName')?.value);
    if (this.caseForm.valid) {
      this._crud.post_hearing_date(formUpdate).subscribe(
        (res: any) => {
          this._shared.tostSuccessTop('Hearing Date Added Successfully');
          this.caseForm.reset();
          this._router.navigate(['/home/vakiltotalcase'])
        },
        (error: any) => {
          this._shared.tostErrorTop('Error Adding Hearing Date');
        }
      )
    }
    else {
      this._shared.tostErrorTop('Please fill all the fields');
    }
  }

  backButtonToCaseList() {
    localStorage.removeItem('CaseNo');
    this._router.navigate(['/home/vakiltotalcase']);
  }
}