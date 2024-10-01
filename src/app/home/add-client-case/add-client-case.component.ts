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
  addCase_form!: FormGroup
  login: any;
  login_data: any;
  clientName: any;
  court_list: any;
  Aadhar_select: any;
  member_select_docs: any;
  MemberDocument: any;

  constructor(
    private _fb: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService,
    private _router: Router
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
      clientId: ['', Validators.required],
      caseTitle: ['', Validators.required],
      caseno: ['', Validators.required],
      court: ['', Validators.required],
      act: ['', Validators.required],
      firdate: ['', Validators.required],
      advocatefee: ['', Validators.required],
      aboutcase: ['', Validators.required],
      document: [''],
      MemberDataList: this._fb.array([]),
    })
  }

  get membersArray() {
    return this.addCase_form.get('MemberDataList') as FormArray;
  }

  addMemberControls() {
    const memberNumber = this.membersArray.length + 1;
    const memberGroup = this._fb.group({
      [`fatherName${memberNumber}`]: [''],
      [`membername${memberNumber}`]: [''],
      [`membercontactNum${memberNumber}`]: [''],
      [`memberDetail${memberNumber}`]: [''],
      [`memberaddress${memberNumber}`]: [''],
      [`MemberDocument${memberNumber}`]: [''],
    });
    this.membersArray.push(memberGroup);
  }

  removeMember(index: number) {
    this.membersArray.removeAt(index + 0);
  }

  // for select Aadhar Card
  onAadhar(event: Event) {
    const input = event.target as HTMLInputElement;
    this.Aadhar_select = [];

    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach((file: File) => {
        const reader = new FileReader();

        reader.onload = () => {
          console.log('File content:', reader.result);
        };

        reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };

        reader.readAsDataURL(file);
        this.Aadhar_select.push(file);
      });
    } else {
      console.log('No files selected');
    }
  }

  // for select BarCouncil
  memberDocs(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('File content:', reader.result);
        this.MemberDocument = file;
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  }

  onSubmit() {
    if (this.addCase_form.valid) {
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
      formdata.append('document', this.Aadhar_select);
      formdata.append('MemberDataList', JSON.stringify(this.addCase_form.get('MemberDataList')?.value));

      this._crud.get_case_duplicate_number(this.login_data.advId, this.addCase_form.value?.caseno).subscribe(
        (res: any) => {
          if (res.status === true) {
            this._shared.tostErrorTop('Case Number Already Exists');
            return
          }
          this._crud.post_add_case(formdata).subscribe(
            (res: any) => {
              if (res.status === true) {
                this._shared.tostSuccessTop('Add Case Successfully...');
                this.addCase_form.reset();
                this._router.navigate(['/home/vakiltotalcase']);
              }
              else {
                this._shared.tostErrorTop('Not Add Case')
              }
            },
            (error: any) => {
              console.error(error);
              this._shared.tostErrorTop('Not Add Case')
            }
          )
        }
      )
    }
    else {
      this._shared.tostErrorTop('Please Fill All Fields')
    }
  }
}
