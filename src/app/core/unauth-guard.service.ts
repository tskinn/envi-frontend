import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { CognitoService } from './cognito.service';
import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class UnauthGuardService {

  constructor(private oauthService: OAuthService, private authService: AuthGuardService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.oauthService.hasValidAccessToken()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
