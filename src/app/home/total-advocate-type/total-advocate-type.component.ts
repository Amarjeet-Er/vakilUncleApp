import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-total-advocate-type',
  templateUrl: './total-advocate-type.component.html',
  styleUrls: ['./total-advocate-type.component.scss'],
})
export class TotalAdvocateTypeComponent  implements OnInit {
  articles: any;
  filter_data: any;
  constructor(
    private _router: Router,
    private _crud: CrudService,
    private _shared: SharedService,
  ) { }
  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });
  }
  loadData() {
    this._crud.get_advocate_type().subscribe(
      (response) => {
        if (response.status === true) {
          this.articles = response.data;
          this.filter_data = response.data;
        }
        else {
          this._shared.tostErrorTop('No Record Found')
        }
      }
    )
  }

  filterAdvocate(data: any) {
    this._shared.sharedData.next(data)
    console.log(data);
    this._router.navigate(['/user/home/advocate'])
  }
  onSearch(event: any) {
    const filter = event.target.value.toLowerCase();
    this.articles = this.filter_data.filter((data: any) => {
      if (data?.name.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }

  backButton() {
    this._router.navigate(['/user/home/dashboard'])
  }

}
