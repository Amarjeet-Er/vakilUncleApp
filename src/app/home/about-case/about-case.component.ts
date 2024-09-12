import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-case',
  templateUrl: './about-case.component.html',
  styleUrls: ['./about-case.component.scss'],
})
export class AboutCaseComponent  implements OnInit {

  constructor(
    private _router:Router
  ) { }

  ngOnInit() {}


  backButton(){
    this._router.navigate(['/home/casehearing'])
  }

}
