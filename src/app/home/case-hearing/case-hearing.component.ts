import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-case-hearing',
  templateUrl: './case-hearing.component.html',
  styleUrls: ['./case-hearing.component.scss'],
})
export class CaseHearingComponent implements OnInit {
  @ViewChild('modal') modal !: IonModal;
  panelOpenState = false;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() { }

  // for about case button 
  AboutCase() {
    this._router.navigate(['/home/aboutcase'])
  }

  openModal() {
    this.modal.present()
  }
  backButton() {
    this.modal.dismiss()
  }
}
