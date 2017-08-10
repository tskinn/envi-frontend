import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';

import { State } from './state/model';
import { environment } from '../../environments/environment';
import * as Acts from './state/actions';

@Injectable()
export class LoginService {

  constructor(private oauthService: OAuthService, private store: Store<State>) {
    this.oauthService.redirectUri = window.location.origin + '/login';
    this.oauthService.clientId = environment.clientId;
    this.oauthService.scope = environment.scope;
    this.oauthService.oidc = true;
    this.oauthService.issuer = environment.issuer;
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.tryLogin({
        onTokenReceived: context => {
          console.log("hello token");
          console.log(context);
        },
        validationHanlder: context => {
          console.log(context);
        }
      });
    })
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
  }

}
