import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vakil-account-status',
  templateUrl: './vakil-account-status.component.html',
  styleUrls: ['./vakil-account-status.component.scss'],
})
export class VakilAccountStatusComponent implements OnInit {
  ngOnInit(): void {
  }

  status = 'active';  // Can be 'active' or 'expired'
  planType = 'Premium';
  renewalDate = '2024-12-31';
  features = 'Access to all resources, priority support';

  renewPlan() {
    // Logic for renewing the plan
    console.log('Plan renewal initiated');
  }
}