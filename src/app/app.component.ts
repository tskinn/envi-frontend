import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DbItem } from './core/db-item';
import { CognitoService } from './core/cognito.service';

@Component({
  selector: 'app-root',
  template: `
    <md-toolbar color="primary" class="toolbar">
      <span>Welcome to {{title}}!!</span>
      <span class="spacer"></span>
      <button md-button *ngIf="(loggedIn | async)">Logout</button>
    </md-toolbar>
    <md-sidenav-container class="container">
      <md-sidenav #sidenav mode="side" [opened]="loggedIn | async" class="sidenav">
        <md-nav-list>
          <md-list-item *ngFor="let link of navLinks" [routerLink]=[link.name] routerLinkActive="active">
            <a md-line ><md-icon class="material-icons">{{link.icon}}</md-icon></a>
          </md-list-item>
        </md-nav-list>
      </md-sidenav>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </md-sidenav-container>
  `,
  styles: [`
    .sidenav {
      height: 100%;
      padding: 10px;
    }
    .content {
      display: flex;
      height: 100%;
      width:: 100%;
      align-items: center;
      justify-content: center;
    }
    .container {
      width: 100%;
      height: 100%;
    }
    .material-icons {
      font-size: 32px;
      padding: 0 6px;
      font-family: 'Material Icons';
    }
    .toolbar {
      position: relative;
      z-index: 4;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .active {
      color: red;
    }
`]
})
export class AppComponent implements OnInit {
  loggedIn: Observable<boolean>;
  title = 'app';
  navLinks = [
    { "name": "search", "icon": "search" },
    { "name": "edit", "icon": "create" },
    { "name": "import", "icon": "file_upload" },
    { "name": "export", "icon": "get_app" }
  ]

  constructor(private cognito: CognitoService) {
    this.loggedIn = cognito.isLoggedIn();
    var item: DbItem;
    item = {
      "name": "omega",
      "environment": "staging",
      "lock": 1,
      "vars": {
        "DNS": "somedns"
      }
    }
    console.log(item);
  }

  ngOnInit() {
    this.loggedIn.subscribe(item => {
      console.log(item);
    })
  }
}
