import { Component, OnInit } from '@angular/core';
import { CognitoService } from '../../core/cognito.service';

@Component({
  selector: 'app-login-container',
  template: `
    <div class="container">
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
    </div>
  `,
  styles: [`
    .container {
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

  constructor(private cognito: CognitoService) { }

  ngOnInit() {
    console.log("logincontainer init...");
  }

  login() {
    this.cognito.login();
  }
}
