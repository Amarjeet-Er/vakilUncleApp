import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membership-plan-validity',
  templateUrl: './membership-plan-validity.component.html',
  styleUrls: ['./membership-plan-validity.component.scss'],
})
export class MembershipPlanValidityComponent  implements OnInit {
  memberName = 'John Doe';
  fee = 5000;
  features = ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'];
  startDate = new Date(2024, 0, 1);
  endDate = new Date(2024, 11, 31);

  constructor() {}

  ngOnInit() {}
}
