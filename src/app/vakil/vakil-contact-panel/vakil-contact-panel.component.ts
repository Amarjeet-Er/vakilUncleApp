import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vakil-contact-panel',
  templateUrl: './vakil-contact-panel.component.html',
  styleUrls: ['./vakil-contact-panel.component.scss'],
})
export class VakilContactPanelComponent  implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit() { }

  chatRoute() {
    this._router.navigate(['/home/chat'])
  }

  vakilProfile(){
    this._router.navigate(['/vakil/home/account'])
  }
}
