import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-image-banner-management',
  templateUrl: './image-banner-management.component.html',
  styleUrls: ['./image-banner-management.component.scss'],
})
export class ImageBannerManagementComponent implements OnInit {
  @ViewChild('modal') modal !: IonModal;
  login: any;
  login_data: any;
  image_banner: any;
  img_url: any;
  filterData: any;
  banner_select: any;
  addImage_form!: FormGroup;

  constructor(
    private _crud: CrudService,
    private _shared: SharedService,
    private _fb: FormBuilder
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
    this.addImage_form = this._fb.group({
      title: ['', Validators.required],
      image: [''],
    })
    this._crud.get_image_banner(this.login_data.advId).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.image_banner = res.data;
          this.filterData = res.data;
        }
      }
    )
  }

  // for select Aadhar Card
  onBanner(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('File content:', reader.result);
        this.banner_select = file;
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  }

  onSubmit() {
    if (this.addImage_form.valid && this.banner_select) {
      const formdata = new FormData();
      formdata.append('vakilId', this.login_data.advId);
      formdata.append('title', this.addImage_form.get('title')?.value);
      formdata.append('image', this.banner_select);
      this._crud.add_image_banner(formdata).subscribe(
        (res: any) => {
          if (res.status === true) {
            this._shared.tostSuccessTop(res.message);
            this.addImage_form.reset();
            this._crud.get_image_banner(this.login_data.advId).subscribe(
              (response: any) => {
                if (response.status === true) {
                  this.image_banner = response.data;
                  this.filterData = response.data;
                }
              }
            );
            this.modal.dismiss();
          } else {
            this._shared.tostErrorTop(res.message);
          }
        },
        (error: any) => {
          this._shared.tostErrorTop(error);
        }
      );
    } else {
      this._shared.tostWrraingTop('All fields are required');
    }
  }

  AddImage() {
    this.modal.present()
  }

  backButton() {
    this.modal.dismiss()
  }

  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.image_banner = this.filterData.filter((data: any) => {
      if (data?.title.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}
