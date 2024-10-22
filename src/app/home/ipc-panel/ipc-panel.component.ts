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
  section_id: any;
  filter_data: any;
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

    this._shared.sharedData.subscribe(
      (response) => {
        console.log(response, 'kanoon');
        this.section_id = response;
        this._crud.get_ipc_section(this.section_id?.bareId).subscribe(
          (response) => {
            if (response.status === true) {
              console.log(response.data, 'kanoon list');
              this.ipc_list = response.data;
              this.filter_data = response.data;
            }
            else {
              this._shared.tostErrorTop('No Record Found')
            }
          }
        )
      }
    )
   
  }

  ngOnInit() { 
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
  }

  onDetails(data: any) {
    this._shared.sharedData.next(data)
    console.log(data);
    this._router.navigate(['/home/ipcdetails'])
  }

  advocate_Profile(data: any) {
    localStorage.setItem('vakilProfile', JSON.stringify(data.advId))
    this._router.navigate(['/home/advocateportfolio'])
  }
  see_All(data: any) {
    this._shared.sharedData.next(data);
    this._router.navigate(['/home/changelwayerslist']);
  }

  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.ipc_list = this.filter_data.filter((data: any) => {
      if (data?.actSection.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }

}
