import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-container',
  template: `
    <md-input-container>
      <input mdInput>
      <input mdInput type="password">
    </md-input-container>
    <p>
      login-container Works!
    </p>
  `,
  styles: []
})
export class LoginContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("logincontainer init...");
  }

}
