import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VakilHomePageComponent } from './vakil-home-page/vakil-home-page.component';
import { VakilDashboardComponent } from './vakil-dashboard/vakil-dashboard.component';
import { VakilAccountComponent } from './vakil-account/vakil-account.component';
import { VakilContactPanelComponent } from './vakil-contact-panel/vakil-contact-panel.component';
import { ClientListComponent } from './client-list/client-list.component';
import { MembershipManagementComponent } from '../home/membership-management/membership-management.component';

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
      { path: 'clientlist', component: ClientListComponent },
      {path:'membership', component: MembershipManagementComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VakilRoutingModule { }
