import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  template: `
    <p>
      login Works!
    </p>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private oauthService: OAuthService, private router: Router) {
    this.oauthService.events
      .filter(e => e.type == 'token_received')
      .subscribe(e => {
        this.router.navigateByUrl('')
      });
  }

  ngOnInit() {
  }

}
