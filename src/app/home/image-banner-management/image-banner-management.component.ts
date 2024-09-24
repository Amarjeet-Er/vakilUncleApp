import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(
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
    this._crud.get_image_banner(this.login_data.advId).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.image_banner = res.data;
          this.filterData = res.data;
        }
      }
    )
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
      if (data?.imageUrl.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}
