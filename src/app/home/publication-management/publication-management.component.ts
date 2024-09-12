import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-publication-management',
  templateUrl: './publication-management.component.html',
  styleUrls: ['./publication-management.component.scss'],
})
export class PublicationManagementComponent implements OnInit {
  @ViewChild('modal') modal !: IonModal;

  constructor() { }

  ngOnInit() { }

  AddPublication() {
    this.modal.present()
  }

  backButton() {
    this.modal.dismiss()
  }
}
