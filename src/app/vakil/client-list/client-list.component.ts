import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit() { }

  // for add case 
  addClientCase() {
    this._router.navigate(['/home/addclientcase'])
  }

  // for manage/about case 
  clientCase() {
    this._router.navigate(['/home/casehearing'])
  }
}
