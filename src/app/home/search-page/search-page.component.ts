import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  @ViewChild('searchbar', { static: false }) searchbar !: IonSearchbar;



  constructor(
    private _router: Router
  ) { }

  ionViewDidEnter() {
    this.searchbar.setFocus();
  }


  ngOnInit() { }


  onCancel() {
    this._router.navigate(['/user/home/dashboard']);
  }
}
