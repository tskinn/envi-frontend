import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';

import { State } from './state/model';
import { environment } from '../../environments/environment';
import * as Acts from './state/actions';

@Injectable()
export class LoginService {

  constructor(private oauthService: OAuthService, private store: Store<State>, private router: Router) {
  }


  login() {
    this.oauthService.initImplicitFlow();
    // this.oauthService.initImplicitFlow();
    // let thing = this.oauthService.hasValidAccessToken()
    // if (thing) {
    //   console.log("we logged in?");
    //   this.store.dispatch({ type: Acts.LOGGED_IN });
    // }
  }

  isLoggedIn() {
  }

  logout() {
    this.oauthService.logOut();
    this.router.navigate(['/login']);
  }

}
