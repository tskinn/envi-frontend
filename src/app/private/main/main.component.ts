import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SuperSearchComponent } from '../super-search/super-search.component';
import { ExportComponent } from '../export/export.component';
import { ImportComponent } from '../import/import.component';
import { CognitoService } from '../../core/cognito.service';
import { DbItem } from '../../core/db-item';
import { State } from '../../core/model';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styles: [`
md-toolbar {
  z-index: 3;
  position: relative;
  box-shadow: 0 3px 3px #999
}
.spacer {
  flex: 1 1 auto;
}
.active {
  color: red;
}
`]
})
export class MainComponent implements OnInit {
  items_: DbItem[];
  items: Observable<DbItem[]>;
  selected: Observable<DbItem>;
  constructor(private store: Store<State>, private cognito: CognitoService, public dialog: MdDialog) {
    this.items = store.select('app', 'items')
    this.selected = store.select('app', 'selected')
    this.items.subscribe(items => this.items_ = items);
  }

  ngOnInit() {
  }

  logout() {
    this.cognito.logout();
  }

  refresh() {
    console.log("refresh");
  }

  openSearch() {
    console.log("opening search");
    this.dialog.open(SuperSearchComponent).afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  openExport() {
    this.dialog.open(ExportComponent).afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  openImport() {
    this.dialog.open(ImportComponent).afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  onSave(item: DbItem) {
    console.log("saving " + item.name); // TODO change to UPDATE_ITEM once dynamodb conected
    this.store.dispatch({ type: "ITEM_UPDATED", payload: item });
  }

  onSelect(item: DbItem) {
    this.store.dispatch({ type: "SELECT", payload: item });
  }
}
