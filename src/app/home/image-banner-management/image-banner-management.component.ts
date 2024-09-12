import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-image-banner-management',
  templateUrl: './image-banner-management.component.html',
  styleUrls: ['./image-banner-management.component.scss'],
})
export class ImageBannerManagementComponent  implements OnInit {

  @ViewChild('modal') modal !: IonModal;


  constructor() { }

  ngOnInit() { }



  AddImage() {
    this.modal.present()
  }

  backButton() {
    this.modal.dismiss()
  }

}
