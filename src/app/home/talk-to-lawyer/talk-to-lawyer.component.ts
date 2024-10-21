import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-talk-to-lawyer',
  templateUrl: './talk-to-lawyer.component.html',
  styleUrls: ['./talk-to-lawyer.component.scss'],
})
export class TalkToLawyerComponent implements OnInit {
  sub_cat_list: any;
  cat_list: any;
  city_list: any;
  adv_type_id: any;
  find_lawyers: any;
  img_url: any;
  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  @ViewChild('talktolawyer') talktolawyer !: IonModal;

  isChecked: boolean = false;
  clientForm!: FormGroup;

  constructor(
    private _crud: CrudService,
    private _router: Router,
    private _shared: SharedService,
    private _fb: FormBuilder
  ) {
    this._shared.img_url.subscribe(
      (data) => {
        this.img_url = data
      }
    )
    this._crud.get_city_list().subscribe(
      (response: any) => {
        console.log(response.data);
        if (response.data) {
          this.city_list = response.data;
        }
      },
      error => console.error(error)
    );
    this._crud.get_robot_cat().subscribe(
      (response: any) => {
        console.log(response.data);
        if (response.data) {
          this.cat_list = response.data;
        }
      },
      error => console.error(error)
    );
  }

  sub_cat_Issue(event: any) {
    const selectedId = event.detail.value;
    console.log(selectedId, 'value');
    this._crud.get_robot_cat_id(selectedId).subscribe(
      (response: any) => {
        if (response.data) {
          this.sub_cat_list = response.data;
        }
      },
      error => console.error(error)
    );
  }
  sub_cat_adv_type(event: any) {
    const selectedId = event.detail.value;
    const selectedSubCat = this.sub_cat_list.find((cat: { id: any; }) => cat.id === selectedId);
    if (selectedSubCat) {
      this.adv_type_id = selectedSubCat.advTyId;
      console.log('Selected Sub Category ID:', selectedId);
      console.log('Selected advTyId:', this.adv_type_id);
    }
  }

  ngOnInit() {
    this.clientForm = this._fb.group({
      clientName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      ContactNum: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      city: ['', Validators.required],
      subCatId: ['', Validators.required],
      catId: ['', Validators.required],
      advTyId: ['', Validators.required],
    });
  }

  submit() {
    this.onSubmit()
    this.talktolawyer.present()
  }

  onSubmit() {
    const formdata = new FormData()
    console.log(this.clientForm.value, 'sent message');
    formdata.append('clientName', this.clientForm.get('clientName')?.value);
    formdata.append('email', this.clientForm.get('email')?.value);
    formdata.append('description', this.clientForm.get('description')?.value);
    formdata.append('ContactNum', this.clientForm.get('ContactNum')?.value);
    formdata.append('city', this.clientForm.get('city')?.value);
    formdata.append('catId', this.clientForm.get('catId')?.value);
    formdata.append('subCatId', this.clientForm.get('subCatId')?.value);
    formdata.append('advTyId', this.adv_type_id);

    this._crud.robot_find_lawyer(formdata).subscribe(
      (res: any) => {
        console.log(res, 'res');
        if (res.status === true) {
          this.find_lawyers = res.data
          this.clientForm.reset()
          this._shared.tostSuccessTop('Success');
        }
      }
    )
  }

}
