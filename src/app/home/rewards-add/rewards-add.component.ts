import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-rewards-add',
  templateUrl: './rewards-add.component.html',
  styleUrls: ['./rewards-add.component.scss'],
})
export class RewardsAddComponent  implements OnInit {
  @ViewChild('modal') modal !: IonModal;
  rewared_form!: FormGroup
  document_select: any;
  document_select1: any;
  login: any;
  login_data: any;
  view_rewards: any;
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
    this.rewared_form = this.formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      docs1: [''],
      docs2: [''],
    })
    this._crud.get_rewards(this.login_data.advId).subscribe(
      (res: any) => {
        console.log(res, 'response');
        this.view_rewards = res.data;
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

  onDocument1(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('File content:', reader.result);
        this.document_select1 = file;
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  }

  onSubmit() {
    console.log(this.rewared_form.value);
    const formdata = new FormData();
    formdata.append('vakilId', this.login_data.advId)
    formdata.append('title', this.rewared_form.get('title')?.value)
    formdata.append('desc', this.rewared_form.get('desc')?.value)
    formdata.append('docs1', this.document_select);
    formdata.append('docs2', this.document_select1);
    console.log(this.document_select1, 'doc');
    
    if (this.rewared_form.valid) {
      this._crud.add_rewards(formdata).subscribe((res: any) => {
        console.log(res);
        if (res.status === true) {
          this._shared.tostSuccessTop('Add Success');
          this._crud.get_rewards(this.login_data.advId).subscribe(
            (res: any) => {
              console.log(res, 'response');
              this.view_rewards = res.data;
            },
          )
          this.rewared_form.reset();
          this.document_select = null;
          this.modal.dismiss();
        }
        else {
          this._shared.tostErrorTop('Not Add');
        }
      },
        (error: any) => {
          console.log(error);
          this._shared.tostErrorTop('Not Add');
        }
      );
    }
    else {
      this._shared.tostErrorTop('Please fill all the fields');
    }
  }

  AddReward() {
    this.modal.present()
  }

  backButton() {
    this.modal.dismiss()
  }

  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.view_rewards = this.filter_data.filter((data: any) =>
      data.title.toLowerCase().includes(filter) ||
      data.desc.toLowerCase().includes(filter) 
    );
  }
}
