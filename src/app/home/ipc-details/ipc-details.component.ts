import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-ipc-details',
  templateUrl: './ipc-details.component.html',
  styleUrls: ['./ipc-details.component.scss'],
})
export class IpcDetailsComponent implements OnInit {
  ipc_details: any;

  constructor(
    private _shared: SharedService,
    private _crud: CrudService,
    private _router: Router
  ) {
    this._shared.sharedData.subscribe(
      (res: any) => {
        console.log(res);
        this.ipc_details = res
      }
    )
  }

  ngOnInit() { }
}