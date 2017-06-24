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
    path: 'edit',
    loadChildren: 'app/edit/edit.module#EditModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'search',
    loadChildren: 'app/search/search.module#SearchModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'import',
    loadChildren: 'app/import/import.module#ImportModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'export',
    loadChildren: 'app/export/export.module#ExportModule',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
