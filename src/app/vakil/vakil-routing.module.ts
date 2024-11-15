import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VakilHomePageComponent } from './vakil-home-page/vakil-home-page.component';
import { VakilDashboardComponent } from './vakil-dashboard/vakil-dashboard.component';
import { VakilAccountComponent } from './vakil-account/vakil-account.component';
import { VakilContactPanelComponent } from './vakil-contact-panel/vakil-contact-panel.component';
import { MembershipManagementComponent } from '../home/membership-management/membership-management.component';
import { NewClientRegComponent } from '../home/new-client-reg/new-client-reg.component';
import { VakilChangePasswordComponent } from './vakil-change-password/vakil-change-password.component';
import { TotalClientComponent } from '../home/total-client/total-client.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: VakilHomePageComponent,
    children: [
      { path: '', component: VakilDashboardComponent },
      { path: 'dashboard', component: VakilDashboardComponent },
      { path: 'account', component: VakilAccountComponent },
      { path: 'contact', component: VakilContactPanelComponent },
      { path: 'membership', component: MembershipManagementComponent },
      { path: 'vakilchangepassword', component: VakilChangePasswordComponent },
      { path: 'totalclientlist', component: TotalClientComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VakilRoutingModule { }
