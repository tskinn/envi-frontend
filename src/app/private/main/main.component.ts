import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SuperSearchComponent } from '../super-search/super-search.component';
import { ExportComponent } from '../export/export.component';
import { ImportComponent } from '../import/import.component';
import { LoginService } from '../../core/login.service';
import { DbItem } from '../../core/db-item';
import { State } from '../../core/state/model';
import { getItems, getSelected } from '../../core/state/reducer';
import * as Acts from '../../core/state/actions';

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
  currentItems: DbItem[];
  items: Observable<DbItem[]>;
  selectedItem: Observable<DbItem>;
  constructor(private store: Store<State>, private loginService: LoginService, public dialog: MdDialog) {
    this.items = store.select(getItems);
    this.items.subscribe(items => this.currentItems = items);
    this.selectedItem = store.select(getSelected).map(id => {
      return this.currentItems.find(item => item.id == id);
    })
    this.store.dispatch({type: Acts.SELECTED, payload: '12334'});
  }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
  }

  refresh() {
    console.log('refresh');
  }

  openSearch() {
    console.log('opening search');
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
    console.log('saving ' + item.name); // TODO change to UPDATE_ITEM once dynamodb conected
    this.store.dispatch({ type: Acts.ITEM_UPDATED, payload: item });
  }

  onSelect(id: string) {
    this.store.dispatch({ type: Acts.SELECTED, payload: id });
  }
}
