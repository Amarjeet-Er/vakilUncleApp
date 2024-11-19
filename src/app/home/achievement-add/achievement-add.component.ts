import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-achievement-add',
  templateUrl: './achievement-add.component.html',
  styleUrls: ['./achievement-add.component.scss'],
})
export class AchievementAddComponent implements OnInit {
  @ViewChild('modal') modal !: IonModal;
  achievement_form!: FormGroup
  document_select: any;
  document_select1: any;
  login: any;
  login_data: any;
  view_achivement: any;
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
    this.achievement_form = this.formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      docs1: [''],
      docs2: [''],
    })
    this._crud.get_achievement(this.login_data.advId).subscribe(
      (res: any) => {
        console.log(res, 'response');
        this.view_achivement = res.data;
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
    console.log(this.achievement_form.value);
    const formdata = new FormData();
    formdata.append('vakilId', this.login_data.advId)
    formdata.append('title', this.achievement_form.get('title')?.value)
    formdata.append('desc', this.achievement_form.get('desc')?.value)
    formdata.append('docs1', this.document_select);
    formdata.append('docs2', this.document_select1);
    if (this.achievement_form.valid) {
      this._crud.add_achievement(formdata).subscribe((res: any) => {
        console.log(res);
        if (res.status === true) {
          this._shared.tostSuccessTop(res.message);
          this._crud.get_achievement(this.login_data.advId).subscribe(
            (res: any) => {
              console.log(res, 'response');
              this.view_achivement = res.data;
            },
          )
          this.achievement_form.reset();
          this.document_select = null;
          this.modal.dismiss();
        }
        else {
          this._shared.tostErrorTop(res.message);
        }
      },
        (error: any) => {
          this._shared.tostErrorTop(error);
        }
      );
    }
  }

  AddAchievement() {
    this.modal.present()
  }

  backButton() {
    this.modal.dismiss()
  }

  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.view_achivement = this.filter_data.filter((data: any) =>
      data.title.toLowerCase().includes(filter) ||
      data.desc.toLowerCase().includes(filter)
    );
  }
}
