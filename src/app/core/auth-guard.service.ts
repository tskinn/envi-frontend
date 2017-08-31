import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { State } from './state/model';
import { getLoggedIn } from './state/reducer';

@Injectable()
export class AuthGuardService implements CanActivate {

  private isLoggedIn: boolean;

  constructor(private store: Store<State>, private router: Router, private oauthService: OAuthService) {
    store.select(getLoggedIn).subscribe(v => this.isLoggedIn = v);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('lets see if we can activate...');
    if (this.oauthService.hasValidAccessToken()) {
      console.log('we can activate it');
      return true;
    }
    this.router.navigateByUrl('login');
    console.log('we cannot activate it');
    return false;
  }
}
