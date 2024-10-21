import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-ipc-panel',
  templateUrl: './ipc-panel.component.html',
  styleUrls: ['./ipc-panel.component.scss'],
})
export class IpcPanelComponent implements OnInit {
  top_Lawyers: any;
  img_url: any;
  ipc_list: any;
  constructor(
    private _router: Router,
    private _crud:CrudService,
    private _shared:SharedService
  ) {
    this._shared.img_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
    
    this._crud.get_top_advocated().subscribe(
      (response) => {
        if (response.status === true) {
          console.log(response.data, 'top lawyers');
          this.top_Lawyers = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )
    this._crud.get_ipc_section().subscribe(
      (response) => {
        if (response.status === true) {
          console.log(response.data, 'top lawyers');
          this.ipc_list = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )
   }

  ngOnInit() { }

  onDetails(data:any) {
    this._shared.sharedData.next(data)
    console.log(data);    
    this._router.navigate(['/home/ipcdetails'])
  }

  advocate_Profile(data:any) {
    localStorage.setItem('vakilProfile', JSON.stringify(data.advId))
    this._router.navigate(['/home/advocateportfolio'])
  }
}
