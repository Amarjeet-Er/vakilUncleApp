import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss'],
})
export class UploadDocumentsComponent implements OnInit {
  upload_docs_form!: FormGroup;
  login: any;
  login_data: any;
  case_number: any;
  court_list: any;
  Aadhar_select: any;

  constructor(
    private _fb: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService,
    private _router: Router
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this._shared.sharedData.subscribe(
      (data: any) => {
        this.case_number = data;
      }
    )
  }

  ngOnInit() {
    this.upload_docs_form = this._fb.group({
      Document_Name: ['', Validators.required],
      document: [''],
    });
  }

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
    formdata.append('caseNum', this.case_number?.caseNo);
    formdata.append('clientId', this.case_number?.id);
    formdata.append('Document_Name', this.upload_docs_form.get('Document_Name')?.value);
    formdata.append('document', this.Aadhar_select);
    if (this.upload_docs_form.valid) {
      this._crud.post_upload_docs(formdata).subscribe
        ((response: any) => {
          this._shared.tostSuccessTop('Document Uploaded')
          this._router.navigate(['/home/vakiltotalcase']);
        }, (error: any) => {
          console.log(error);
          this._shared.tostErrorTop('Not Uploaded')
        });
    }
  }
}