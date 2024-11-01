import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-vakil-review',
  templateUrl: './vakil-review.component.html',
  styleUrls: ['./vakil-review.component.scss'],
})
export class VakilReviewComponent implements OnInit {
  login_data: any;
  login: any;
  review_list: any;

  constructor(
    private _router: Router,
    private _shared: SharedService,
    private _crud: CrudService
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
    this._crud.get_review_total_list(this.login_data.advId).subscribe(
      (response) => {
        console.log(response, 'review');
        if (response.status === true) {
          this.review_list = response.data;
        }
      }
    )
  }
}
