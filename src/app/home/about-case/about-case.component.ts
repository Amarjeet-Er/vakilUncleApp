import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-about-case',
  templateUrl: './about-case.component.html',
  styleUrls: ['./about-case.component.scss'],
})
export class AboutCaseComponent implements OnInit {
  login_data: any;
  login: any;
  about_case: any;
  memberDetails: any;
  case_no: any;
  case_data: any;
  clientName: any;
  add_members_form!: FormGroup;
  caseMembers: any;


  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService,
    private _fb: FormBuilder,
    private alertController: AlertController
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this.fetchDropdownData();
  }

  fetchDropdownData() {
    this._crud.get_new_Client(this.login_data.advId).subscribe((res: any) => {
      this.clientName = res.data;
    });
  }

  ngOnInit() {
    this.add_members_form = this._fb.group({
      caseNo: [''],
      clientId: [''],
    });
  }

  onClientSelect(event: any) {
    const clientId = event.detail.value;
    const selectedClient = this.clientName.find((client: { id: any; }) => client.id === clientId);
    this.caseMembers = selectedClient.caseNo
    console.log(this.caseMembers, 'id');
    this._crud.get_case_about_law_list(this.login_data.advId, this.caseMembers).subscribe(
      (res: any) => {
        console.log(res);
        this.about_case = res.data;
        this.memberDetails = res.data.memberDetails;
      }
    )
    if (selectedClient && selectedClient.caseNo) {
      this.add_members_form.get('caseNo')?.setValue(selectedClient.caseNo);
    } else {
      this.add_members_form.get('caseNo')?.setValue('');
    }
  }

  async removeMember(data: any) {
    console.log(data.MemId);
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this member?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Delete canceled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            const formdata = {
              caseNum: this.add_members_form.get('caseNo')?.value,
              MemId: data.MemId,
              vakilId: this.login_data.advId,
              clientId: this.add_members_form.get('clientId')?.value,
            };
            console.log(formdata);
            this._crud.post_delete_member(formdata).subscribe(
              (res: any) => {
                console.log(res, 'result delete');
                if (res.status === true) {
                  this._shared.tostSuccessTop('Member Deleted');
                } else {
                  this._shared.tostErrorTop('Member Not Deleted');
                }
              },
              (error: any) => {
                this._shared.tostErrorTop('Member Not Deleted');
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }



  backButton() {
    this._router.navigate(['/home/vakiltotalcase'])
  }
}

