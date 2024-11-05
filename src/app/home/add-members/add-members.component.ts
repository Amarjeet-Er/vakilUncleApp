import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss'],
})
export class AddMembersComponent implements OnInit {
  add_members_form!: FormGroup;
  login: any;
  login_data: any;
  clientName: any;
  Aadhar_select: any;
  case_number: any;

  constructor(
    private _fb: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService,
    private _router: Router
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this._shared.sharedData.subscribe(
      (data) => {
        this.case_number = data;
      }
    )
  }

  ngOnInit() {
    this.add_members_form = this._fb.group({
      memberName: [''],
      membercontactNum: ['', [Validators.pattern('\\d{10}')]],
      memberDetails: [''],
      memberaddress: [''],
      fatherName: [''],
      vakilId: [''],
      memberDocument: [''],
    });
  }

  // For select Aadhar Card
  onAadhar(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('File content:', reader.result);
        this.Aadhar_select = file;
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  }

  onSubmit() {
    const formdata = new FormData();
    formdata.append('vakilId', this.login_data.advId);
    formdata.append('clientId', this.case_number.id);
    formdata.append('caseNo', this.case_number.caseNo);
    formdata.append('memberName', this.add_members_form.get('memberName')?.value);
    formdata.append('membercontactNum', this.add_members_form.get('membercontactNum')?.value);
    formdata.append('memberDetails', this.add_members_form.get('memberDetails')?.value);
    formdata.append('memberaddress', this.add_members_form.get('memberaddress')?.value);
    formdata.append('fatherName', this.add_members_form.get('fatherName')?.value);
    formdata.append('memberDocument', this.Aadhar_select);

    console.log(this.add_members_form.value);
    this._crud.post_add_members(formdata).subscribe(
      (res: any) => {
        if (res.status === "success") {
          this._shared.tostSuccessTop('Add Member Successfully...');
          this.add_members_form.reset();
          this._router.navigate(['/home/vakiltotalcase']);
        } else {
          this._shared.tostErrorTop('Not Add Member');
        }
      },
      (error: any) => {
        console.error(error);
        this._shared.tostErrorTop('Not Add Member');
      }
    );
  }
}
