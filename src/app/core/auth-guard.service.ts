import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { State } from './state/model';
import { CognitoService } from './cognito.service';
import { LoginService } from './login.service';
import { getLoggedIn } from './state/reducer';

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private router: Router, private oauthService: OAuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.oauthService.hasValidAccessToken()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;

  }
}
