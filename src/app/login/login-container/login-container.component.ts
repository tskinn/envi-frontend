import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { LoginService } from '../../core/login.service';

@Component({
  selector: 'app-login-container',
  template: `
<md-toolbar color="primary" class="toolbar">
  <span>Envi</span>
</md-toolbar>
<div class="container">
  <md-card>
    <p>
      <md-input-container>
        <input mdInput placeholder="username">
      </md-input-container>
    </p>
    <p>
      <md-input-container>
        <input mdInput placeholder="password" type="password">
      </md-input-container>
     </p>
    <button md-raised-button (click)="login()">login</button>
  </md-card>
</div>
  `,
  styles: [`
    md-toolbar {
      z-index: 3;
      position: relative;
      box-shadow: 0 3px 3px #999;
    }
    .container {
      margin: 60px;
    }
    md-card {
      width: 240px;
      margin: auto;
    }
    md-input-container {
      width: 100%;
    }
    input {
      width: 100%;
      padding: 0px;
    }
    button {
      width: 100%;
    }
`]
})
export class LoginContainerComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private authService: AuthService, private loginService: LoginService) { }

  ngOnInit() {
    console.log("logincontainer init...");
    this.route.fragment.subscribe((frag) => {

    });
  }

  login() {
    this.loginService.login();
  }
}
