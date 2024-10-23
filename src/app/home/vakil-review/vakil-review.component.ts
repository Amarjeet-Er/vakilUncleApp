import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this._crud.get_review_list(this.login_data.advId).subscribe(
      (response) => {
        console.log(response);
        if (response.status === true) {
          this.review_list = response.data;
        }
      }
    )
  }

}
