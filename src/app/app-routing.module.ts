import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './core/auth-guard.service';
import { UnauthGuardService } from './core/unauth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: "full"
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule',
    canActivate: [UnauthGuardService]
  },
  {
    path: 'private',
    loadChildren: 'app/private/private.module#PrivateModule',
    canActivate: [AuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
