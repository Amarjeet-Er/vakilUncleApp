import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-case-documents',
  templateUrl: './case-documents.component.html',
  styleUrls: ['./case-documents.component.scss'],
})
export class CaseDocumentsComponent implements OnInit {

  @ViewChild('modal') modal!: IonModal;

  login: any;
  login_data: any;
  total_case_docs: any;
  img_url: any;
  case: any;
  case_no: any
  docs: any;

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
    this._crud.get_new_Client(this.login_data.advId).subscribe(
      (response) => {
        console.log(response, 'case documnet');
        this.total_case_docs = response.data;
      },
      (error) => {
        console.error(error);
      }
    );

   
  }


  caseDocs(case_doc: any) {
    console.log(case_doc.caseNo);
    this._crud.get_case_document(this.login_data.advId, case_doc.caseNo).subscribe(
      (response) => {
        console.log(response.data.documentUrl, 'case document');
        this.docs = response.data.documentUrl
      }
    )
    return
    localStorage.setItem('caseNo', JSON.stringify(case_doc.caseNo))
    this.modal.present()
  }
}
