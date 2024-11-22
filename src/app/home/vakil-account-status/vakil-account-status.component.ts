import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-vakil-account-status',
  templateUrl: './vakil-account-status.component.html',
  styleUrls: ['./vakil-account-status.component.scss'],
})
export class VakilAccountStatusComponent implements OnInit {
  login: any;
  login_data: any;
  plan_data: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login)
  }

  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
  }
  loadData() {
    this._crud.get_plan_validity(this.login_data.advId).subscribe(
      (res: any) => {
        console.log(res.data);
        if (res?.status === true) {
          this.plan_data = res.data[0];
        }
        else {
          console.log('No Data');
        }
      },
      (error) => {
        console.error('Error fetching plan validity:', error);
      }
    );
  }
  getTotalUsedService(): { key: string; value: any }[] {
    if (this.plan_data?.totalUsedService) {
      return Object.entries(this.plan_data.totalUsedService).map(([key, value]) => ({
        key,
        value,
      }));
    }
    return [];
  }

  handleClick(member: any) {
    console.log(member);

    switch (member?.key) {
      case 'Article':
        this.addPublication();
        break;
      case 'Image and Banner':
        this.addImageBanner();
        break;
      case 'video':
        this.addVideo();
        break;
      case 'Client Registration':
        this.registerNewClient();
        break;
      case 'Achievement':
        this.addachievement();
        break;
      case 'Rewards':
        this.addrewards();
        break;
      default:
        this.disable();
        break;
    }
  }
  registerNewClient() {
    this._router.navigate(['/home/newclientreg'])
  }
  addVideo() {
    this._router.navigate(['/home/videomanagement'])
  }
  addImageBanner() {
    this._router.navigate(['/home/imagemanagement'])
  }
  addPublication() {
    this._router.navigate(['/home/publication'])
  }
  addachievement() {
    this._router.navigate(['/home/achievementadd'])
  }
  addrewards() {
    this._router.navigate(['/home/rewardsadd'])
  }
  disable() { }
}
