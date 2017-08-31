import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AuthGuardService } from './core/auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
{
  path: '',
  component: MainComponent,
  canActivate: [AuthGuardService]
},
  {
  path: 'login',
  component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
