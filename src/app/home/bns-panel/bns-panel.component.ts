import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bns-panel',
  templateUrl: './bns-panel.component.html',
  styleUrls: ['./bns-panel.component.scss'],
})
export class BnsPanelComponent  implements OnInit {
  bnsSections = [
    'Section 497 BNS', 'Section 354 BNS', 'Section 34 BNS', 'Section 506 BNS', 'Section 304 BNS', 'Section 144 BNS',
    'Section 498A BNS', 'Section 120B BNS', 'Section 376 BNS', 'Section 307 BNS', 'Section 302 BNS', 
    // Add more IPC sections as needed
  ];
  constructor() { }

  ngOnInit() {}

}
