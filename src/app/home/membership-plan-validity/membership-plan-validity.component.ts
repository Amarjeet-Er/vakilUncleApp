import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-membership-plan-validity',
  templateUrl: './membership-plan-validity.component.html',
  styleUrls: ['./membership-plan-validity.component.scss'],
})
export class MembershipPlanValidityComponent implements OnInit {
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
        console.log(res);
        if (res?.status === true) {
          this.plan_data = res.data;

          // Ensure that feature is a string before splitting
          if (this.plan_data?.feature) {
            this.plan_data.featuresArray = this.plan_data.feature.split(','); // Split the features string into an array
          }
        }
      },
      (error) => {
        console.error('Error fetching plan validity:', error); // Handle errors
      }
    );
  }
}
