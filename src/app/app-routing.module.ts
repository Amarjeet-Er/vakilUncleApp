import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { VakilRegistrationComponent } from './vakil-registration/vakil-registration.component';
import { LoginJunctionComponent } from './login-junction/login-junction.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { LoginVakilComponent } from './login-vakil/login-vakil.component';
import { ClientRegistartionComponent } from './client-registartion/client-registartion.component';
import { ForgotVakilPasswordComponent } from './forgot-vakil-password/forgot-vakil-password.component';
import { ConfirmVakilPasswordComponent } from './confirm-vakil-password/confirm-vakil-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'loginjunction', pathMatch: 'full' },
  { path: 'loginjunction', component: LoginJunctionComponent },
  { path: 'clientregistration', component: ClientRegistartionComponent },
  { path: 'vakilregistration', component: VakilRegistrationComponent },
  { path: 'loginvakil', component: LoginVakilComponent },
  { path: 'loginclient', component: LoginClientComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'confirmpassword', component: ConfirmPasswordComponent },
  { path: 'vakilforgotpassword', component: ForgotVakilPasswordComponent },
  { path: 'vakilconfirmpassword', component: ConfirmVakilPasswordComponent },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'vakil', loadChildren: () => import('./vakil/vakil.module').then(m => m.VakilModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
