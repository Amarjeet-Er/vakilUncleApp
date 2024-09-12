import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-case-documents',
  templateUrl: './case-documents.component.html',
  styleUrls: ['./case-documents.component.scss'],
})
export class CaseDocumentsComponent implements OnInit {

  @ViewChild('modal') modal!: IonModal;

  constructor() { }

  ngOnInit() { }


  caseDocs() {
    this.modal.present()
  }

}
