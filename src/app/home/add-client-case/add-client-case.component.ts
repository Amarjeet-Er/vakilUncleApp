import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-add-client-case',
  templateUrl: './add-client-case.component.html',
  styleUrls: ['./add-client-case.component.scss'],
})
export class AddClientCaseComponent implements OnInit {
  addCase_form!: FormGroup;
  login: any;
  login_data: any;
  clientName: any;
  court_list: any;

  constructor(
    private _fb: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService,
    private _router: Router
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this.fetchDropdownData();
  }

  fetchDropdownData() {
    this._crud.get_new_Client(this.login_data.advId).subscribe((res: any) => {
      this.clientName = res.data;
    });
    this._crud.get_court_list().subscribe((res: any) => {
      if (res.status === true) {
        this.court_list = res.data;
      }
    });
  }

  ngOnInit() {
    this.addCase_form = this._fb.group({
      clientId: ['', Validators.required],
      caseTitle: ['', Validators.required],
      caseno: ['', Validators.required],
      court: ['', Validators.required],
      act: ['', Validators.required],
      firdate: ['', Validators.required],
      advocatefee: ['', Validators.required],
      aboutcase: ['', Validators.required],
    });
  }

  onSubmit() {
    const formdata = new FormData();
    formdata.append('vakilId', this.login_data.advId);
    formdata.append('clientId', this.addCase_form.get('clientId')?.value);
    formdata.append('caseTitle', this.addCase_form.get('caseTitle')?.value);
    formdata.append('caseno', this.addCase_form.get('caseno')?.value);
    formdata.append('court', this.addCase_form.get('court')?.value);
    formdata.append('act', this.addCase_form.get('act')?.value);
    formdata.append('firdate', this.addCase_form.get('firdate')?.value);
    formdata.append('advocatefee', this.addCase_form.get('advocatefee')?.value);
    formdata.append('aboutcase', this.addCase_form.get('aboutcase')?.value);

    this._crud.get_case_duplicate_number(this.login_data.advId, this.addCase_form.value?.caseno).subscribe(
      (res: any) => {
        if (res.status === true) {
          this._shared.tostErrorTop('Case Number Already Exists');
          return;
        }
        if (this.addCase_form.valid) {
          this._crud.post_add_case(formdata).subscribe(
            (res: any) => {
              if (res.status === true) {
                this._shared.tostSuccessTop('Add Case Successfully...');
                this.addCase_form.reset();
                this._router.navigate(['/home/vakiltotalcase']);
              } else {
                this._shared.tostErrorTop('Not Add Case');
              }
            },
            (error: any) => {
              console.error(error);
              this._shared.tostErrorTop('Not Add Case');
            }
          );
        }
        else {
          this._shared.tostErrorTop('Please fill all the fields');
        }
      }
    );
  }
}
