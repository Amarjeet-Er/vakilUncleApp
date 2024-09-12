import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-new-client-reg',
  templateUrl: './new-client-reg.component.html',
  styleUrls: ['./new-client-reg.component.scss'],
})
export class NewClientRegComponent implements OnInit {
  @ViewChild('modal') modal !: IonModal;
  @ViewChild('details') details !: IonModal;
  clients = [
    { name: 'John Doe', contact: 5698652354, caseno: 5698, casetitle: 'Brown v. Board of Education', image: '../../../assets/images/image_1.jfif' },
    { name: 'Michael Brown', contact: 3256457898, caseno: 1245, casetitle:'Roe v. Wade', image: '../../../assets/images/image_2.jfif' },
    { name: 'Jane Smith', contact: 1254569878, caseno: 2356, casetitle:'Miranda v. Arizona', image: '../../../assets/images/image_3.jfif' },
    { name: 'Emily Johnson', contact: 5456125654, caseno: 7854, casetitle:'Gideon v. Wainwright', image: '../../../assets/images/image_4.jfif' },
    { name: 'David Wilson', contact: 4512658789, caseno: 1223, casetitle:'Marbury v. Madison', image: '../../../assets/images/image_5.jfif' },
  ]
  images: any
  detail: any
  constructor() { }

  ngOnInit() { }

  AddClientReg() {
    this.modal.present()
  }
  onClientDetails(data: any) {
    this.images = 'http://localhost:4200/' + data.image
    this.detail = data
    this.details.present()
  }

  backButton() {
    if (this.modal || this.details) {
      this.modal.dismiss();
      this.details.dismiss();
    }
  }
}
