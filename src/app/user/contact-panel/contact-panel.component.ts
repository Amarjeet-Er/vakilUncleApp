import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-panel',
  templateUrl: './contact-panel.component.html',
  styleUrls: ['./contact-panel.component.scss'],
})
export class ContactPanelComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit() { }

  chatRoute() {
    this._router.navigate(['/home/chat'])
  }

  userProfile(){
    this._router.navigate(['/user/home/account'])
  }
}
