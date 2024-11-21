import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  view_publication: any;
  img_url: any;
  filter_data: any;

  constructor(
    private formBuilder: FormBuilder,
    private _crud: CrudService,
    private _shared: SharedService
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this._shared.img_url.subscribe(
      (data: any) => {
        this.img_url = data;
      }
    )
  }

  ngOnInit() {
    this.publication_form = this.formBuilder.group({
      vakilId: [''],
      title: ['', Validators.required],
      date: ['', Validators.required],
      journal: ['', Validators.required],
      document: [''],
    })
    this._crud.get_publication(this.login_data.advId).subscribe(
      (res: any) => {
        console.log(res, 'response');
        this.view_publication = res.data;
        this.filter_data = res.data;
      }
    )
  }

  downloadDocument(url: string) {
    window.open(url, '_blank');
  }

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
    formdata.append('document', this.document_select);
    if (this.publication_form.valid) {
      this._crud.add_publication(formdata).subscribe((res: any) => {
        console.log(res);
        if (res.status === true) {
          this._shared.tostSuccessTop(res.message);
          this._crud.get_publication(this.login_data.advId).subscribe(
            (res: any) => {
              console.log(res, 'response');
              this.view_publication = res.data;
              this.filter_data = res.data;
            }
          )
          this.publication_form.reset();
          this.document_select = null;
          this.modal.dismiss();
        }
        else {
          this._shared.tostErrorTop(res.message);
        }
      });
    }
    else {
      this._shared.tostErrorTop('Please fill all the fields');
    }
  }

  AddPublication() {
    this.modal.present()
  }

  backButton() {
    this.modal.dismiss()
  }

  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.view_publication = this.filter_data.filter((data: any) =>
      data.title.toLowerCase().includes(filter) ||
      data.journal.toLowerCase().includes(filter) ||
      data.dateString.toLowerCase().includes(filter)
    );
  }
}
