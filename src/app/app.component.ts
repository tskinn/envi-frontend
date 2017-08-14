import { Component, OnInit } from '@angular/core';

import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
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
        validatioHandler: context => {
          console.log(context);
        }
      });
    })

  }

  ngOnInit() {
  }
}

