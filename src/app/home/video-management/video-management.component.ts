import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-video-management',
  templateUrl: './video-management.component.html',
  styleUrls: ['./video-management.component.scss'],
})
export class VideoManagementComponent  implements OnInit {
  @ViewChild('modal') modal !: IonModal;


  constructor() { }

  ngOnInit() { }



  AddVideo() {
    this.modal.present()
  }

  backButton() {
    this.modal.dismiss()
  }
}
