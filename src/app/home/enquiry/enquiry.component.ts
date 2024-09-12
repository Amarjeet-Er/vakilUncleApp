import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss'],
})
export class EnquiryComponent implements OnInit {
  @ViewChild('enquirydetails') enquirydetails !: IonModal;

  constructor() { }

  ngOnInit() { }

  enquiry() {
    this.enquirydetails.present()
  }
}
