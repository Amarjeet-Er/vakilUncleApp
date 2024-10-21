import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-client-hearing-list',
  templateUrl: './client-hearing-list.component.html',
  styleUrls: ['./client-hearing-list.component.scss'],
})
export class ClientHearingListComponent  implements OnInit {
  hearing_list: any;

  constructor(
    private _shared:SharedService,
    private _crud:CrudService,
    private _router:Router
  ) {
    this._shared.sharedData.subscribe(
      (res:any)=>{
        this.hearing_list=res
      }
    )
   }

  ngOnInit() {}
  
}