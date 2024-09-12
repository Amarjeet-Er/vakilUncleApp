import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kanoon-list',
  templateUrl: './kanoon-list.component.html',
  styleUrls: ['./kanoon-list.component.scss'],
})
export class KanoonListComponent  implements OnInit {

  constructor(
    private _router:Router
  ) { }

  ngOnInit() {}


  backButton(){
    this._router.navigate(['/user/home/dashboard'])
  }

}
