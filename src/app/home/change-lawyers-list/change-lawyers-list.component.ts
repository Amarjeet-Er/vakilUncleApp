import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-change-lawyers-list',
  templateUrl: './change-lawyers-list.component.html',
  styleUrls: ['./change-lawyers-list.component.scss'],
})
export class ChangeLawyersListComponent  implements OnInit {
  selectedList: string = 'city';
  advocated_list: any;
  img_url: any;

  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService
  ) { 
    this._shared.img_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
  }

  ngOnInit() {
    this._shared.sharedData.subscribe(
      (response) => {
        console.log(response);
        this.advocated_list = response
      }
    )
  }

  advocate_Profile(data: any) {
    localStorage.setItem('vakilProfile', JSON.stringify(data.advId))
    this._router.navigate(['/home/advocateportfolio'])
  }


  filterAdvocate() {
    this._router.navigate(['/home/filteradvocate'])
  }
}

