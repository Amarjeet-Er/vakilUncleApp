import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-vakil-contact-panel',
  templateUrl: './vakil-contact-panel.component.html',
  styleUrls: ['./vakil-contact-panel.component.scss'],
})
export class VakilContactPanelComponent implements OnInit {

  login_data: any;
  login: any;
  chat_list: any;
  img_url: any;
  profile_data: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this._shared.img_url.subscribe(
      (data) => {
        this.img_url = data;
      }
    );

    this._crud.get_update_vakil_profile(this.login_data.advId).subscribe(
      (res: any) => {
        this.profile_data = res.data;
      }
    );
  }

  ngOnInit() {
    this._crud.get_vakil_chat_list(this.login_data?.advId).subscribe(
      (response) => {
        console.log(response);
        this.chat_list = response?.data
      }
    )
  }
  chatRoute() {
    this._router.navigate(['/home/chat'])
  }

  vakilProfile() {
    this._router.navigate(['/vakil/home/account'])
  }
}
