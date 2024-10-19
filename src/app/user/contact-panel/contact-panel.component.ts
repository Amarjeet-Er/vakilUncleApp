import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-contact-panel',
  templateUrl: './contact-panel.component.html',
  styleUrls: ['./contact-panel.component.scss'],
})
export class ContactPanelComponent implements OnInit {
  login_data: any;
  login: any;
  chat_list: any;
  img_url: any;
  profile_data: any;
  filter_data: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService
  ) {
    this.login = localStorage.getItem('userLoginData');
    this.login_data = JSON.parse(this.login);

    this._shared.img_url.subscribe(
      (data) => {
        this.img_url = data;
      }
    );

    this._crud.get_client_profile(this.login_data.id).subscribe(
      (res: any) => {
        this.profile_data = res.data;
      }
    );
  }

  ngOnInit() {
    this._crud.get_client_chat_list(this.login_data?.id).subscribe(
      (response) => {
        console.log(response);
        this.chat_list = response?.data
        this.filter_data = response?.data
      }
    )
  }

  chatRoute(clientChat: any) {
    console.log(clientChat);
    localStorage.setItem('clientChat', JSON.stringify(clientChat))
    this._router.navigate(['/home/chatingclient'])
  }

  userProfile() {
    this._router.navigate(['/user/home/account'])
  }


  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.chat_list = this.filter_data.filter((data: any) => {
      if (data?.name.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}
