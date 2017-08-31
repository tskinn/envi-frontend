import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';

import { State } from './core/state/model';
import { environment } from '../environments/environment';
import * as Acts from './core/state/actions';
import * as AWS from 'aws-sdk/global';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private store: Store<State>, private oauthService: OAuthService) {
    this.oauthService.redirectUri = window.location.origin + '/login';
    console.log(window.location.origin + '/login');
    this.oauthService.clientId = environment.clientId;
    this.oauthService.scope = environment.scope;
    this.oauthService.oidc = true;
    this.oauthService.issuer = environment.issuer;
    this.oauthService.setStorage(localStorage);
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.tryLogin().then(_ => {
        if (!this.oauthService.hasValidAccessToken()) {
          this.oauthService.initImplicitFlow();
        } else {
          console.log('Logged in -> claims: ', this.oauthService.getIdentityClaims());
          AWS.config.region = environment.region;
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.identityPoolId,
            Logins:  { 'kyani.okta.com': this.oauthService.getIdToken()  },
          })
        }
      });
    });
    // this.oauthService.events
    //   .filter(e => e.type == 'token_received')
    //   .subscribe(e => {
    //     this.store.dispatch({type: Acts.LOGGED_IN});
    //     this.router.navigateByUrl('/').then(v => console.log('worked? ' + v));
    //   });
    // this.oauthService.events
    //   .filter(e => e.type == '')
  }

  ngOnInit() {
  }
}

