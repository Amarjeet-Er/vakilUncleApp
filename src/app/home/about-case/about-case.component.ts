import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { filter } from 'rxjs';
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
  case_number: any;
  img_url: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService,
    private _fb: FormBuilder,
    private alertController: AlertController,
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this._shared.sharedData.subscribe(
      (data) => {
        this.case_number = data;
      }
    )

    this._shared.img_url.subscribe(
      (data: any) => {
        this.img_url = data;
      }
    )
  }

  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
  }
  loadData() {
    this._crud.get_case_about_law_list(this.login_data.advId, this.case_number.caseNo).subscribe(
      (res: any) => {
        console.log(res);
        this.about_case = res.data;
        this.memberDetails = res.data.memberDetails;
      }
    )
  }

  async removeMember(data: any) {
    const memberId = data.MemId
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
            this._crud.post_delete_members(this.case_number.caseNo, memberId, this.login_data.advId, this.case_number.id).subscribe(
              (res: any) => {
                if (res.status === true) {
                  this._crud.get_case_about_law_list(this.login_data.advId, this.case_number.caseNo).subscribe(
                    (res: any) => {
                      this.about_case = res.data;
                      this.memberDetails = res.data.memberDetails;
                    }
                  )
                  this._shared.tostSuccessTop('Member Deleted')
                }
                else {
                  this._shared.tostErrorTop('Member Not Deleted')
                }
              },
              (error: any) => {
                this._shared.tostErrorTop('Member Not Deleted')
              }
            )
          }
        }
      ]
    });
    await alert.present();
  }

  backButton() {
    this._router.navigate(['/home/vakiltotalcase'])
  }

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: string[] = [];
  selectedOption: string = '';

  filterOptions(event: any) {
    const value = event.target.value?.toLowerCase() || '';
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(value)
    );
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.filteredOptions = [];
  }

  downloadDocument(url: string) {
    window.open(url, '_blank');
  }

}

