import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationStart, Event } from '@angular/router';

import 'rxjs/add/operator/filter';

import { DbItem } from './core/db-item';
import { CognitoService } from './core/cognito.service';

@Component({
  selector: 'app-root',
  template: `
    <md-toolbar color="primary" class="toolbar">
      <span>Envi</span>
      <span class="spacer"></span>
      <button md-icon-button *ngIf="loggedIn | async" (click)="refresh()">
        <md-icon>refresh</md-icon>
      </button>
      <button md-icon-button *ngIf="loggedIn | async">
        <md-icon>file_upload</md-icon>
      </button>
      <button md-icon-button *ngIf="loggedIn | async">
        <md-icon>get_app</md-icon>
      </button>
      <button md-button (click)="logout()" *ngIf="loggedIn | async">
        <span>Logout</span>
      </button>
    </md-toolbar>
	 <md-card>
      <router-outlet></router-outlet>
    </md-card>
  `,
  styles: [`
    .refresh {
      border-radius: 50%;
    }
    .sidenav {
      height: 100%;
      padding: 10px;
    }
    .content {
      display: flex;
      height: 100%;
      width: 100%;
#      align-items: center;
      justify-content: center;
    }
    md-card {
      margin: 50px;
      width: 800px;
    }
    .card-header {
      font-size: 24px;
    }
    .container {
      width: 100%;
      height: 100%;
    }
    .material-icons {
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
  title = 'Login';
  currentRoute = "";
  navLinks = [
    { "name": "search", "icon": "search", "title": "Search", "route": "private/search" },
    { "name": "edit", "icon": "create", "title": "Edit", "route": "private/edit" },
    { "name": "import", "icon": "file_upload", "title": "Import", "route": "private/import" },
    { "name": "export", "icon": "get_app", "title": "Export", "route": "private/export" }
  ]

  constructor(private cognito: CognitoService, private router: Router) {
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

  logout() {
    this.title = "Login"
    this.cognito.logout();
  }

  refresh() {
    console.log("refresh");
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        let paths = event.url.split("/")
        this.currentRoute = paths[paths.length - 1];
      })
    this.loggedIn.subscribe(item => {
      console.log(item);
    })
  }

}
