import { Component, OnInit } from '@angular/core';

import { CognitoService } from './core/cognito.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor(private cognito: CognitoService) {

  }

  ngOnInit() {
  }
}

