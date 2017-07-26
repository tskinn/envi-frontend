import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationStart, Event } from '@angular/router';

import 'rxjs/add/operator/filter';

import { DbItem } from './core/db-item';
import { CognitoService } from './core/cognito.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor(private cognito: CognitoService, private router: Router) {

  }

  ngOnInit() {
  }
}

