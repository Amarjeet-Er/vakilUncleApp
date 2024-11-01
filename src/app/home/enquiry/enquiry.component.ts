import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { filter } from 'rxjs';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss'],
})
export class EnquiryComponent implements OnInit {
  @ViewChild('enquirydetails') enquirydetails !: IonModal;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
  }
  loadData() {

  }
  enquiry() {
    this.enquirydetails.present()
  }
}
