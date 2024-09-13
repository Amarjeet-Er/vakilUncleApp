import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-publication-management',
  templateUrl: './publication-management.component.html',
  styleUrls: ['./publication-management.component.scss'],
})
export class PublicationManagementComponent implements OnInit {
  @ViewChild('modal') modal !: IonModal;
  publication_form!: FormGroup
  document_select: any;
  login: any;
  login_data: any;
  constructor(
    private formBuilder: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);
    console.log(this.login_data, 'dssdds');

  }

  ngOnInit() {
    this.publication_form = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      journal: ['', Validators.required],
      document: [''],
    })
  }

  // for select Aadhar Card
  onDocument(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('File content:', reader.result);
        this.document_select = file;
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  }

  onSubmit() {
    console.log(this.publication_form.value);
    const formdata = new FormData();
    formdata.append('vakilId', this.login_data.advId)
    formdata.append('title', this.publication_form.get('title')?.value)
    formdata.append('date', this.publication_form.get('date')?.value)
    formdata.append('journal', this.publication_form.get('journal')?.value)
    formdata.append('title', this.document_select);
    if (this.publication_form.valid) {
      this._crud.add_publication(formdata).subscribe((res: any) => {
        console.log(res);
      }
      )
    }
  }
  AddPublication() {
    this.modal.present()
  }

  backButton() {
    this.modal.dismiss()
  }
}
