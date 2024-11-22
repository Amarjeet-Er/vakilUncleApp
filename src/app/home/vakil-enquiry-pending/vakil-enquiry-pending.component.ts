import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-vakil-enquiry-pending',
  templateUrl: './vakil-enquiry-pending.component.html',
  styleUrls: ['./vakil-enquiry-pending.component.scss'],
})
export class VakilEnquiryPendingComponent  implements OnInit {
  @ViewChild('enquirydetails') enquirydetails !: IonModal;
  login: any;
  login_data: any;
  enquiry_list: any;
  filterData: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);
  }

  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
  }
  loadData() {
    this._crud.get_enquiry_list(this.login_data?.advId).subscribe(
      (response: any) => {
        console.log(response);
        this.enquiry_list = response.data;
        this.filterData = response.data;
      },
    )
  }
  enquiry() {
    this.enquirydetails.present()
  }
  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.enquiry_list = this.filterData.filter((data: any) => {
      if (data?.clientName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.contactNum.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.email.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.cityName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}
