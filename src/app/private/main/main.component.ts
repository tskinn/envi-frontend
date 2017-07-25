import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DbItem } from '../../core/db-item';
import { State } from '../../core/model';

@Component({
  selector: 'app-main',
  template: `
  <div class="container" fxLayout="row" fxLayoutAline="center start">
    <app-search (onSelect)="onSelect($event)" [items]="items | async"></app-search>
    <app-vars [item]="selected | async" (onSave)="onSave($event)"></app-vars>
  </div>
  `,
  styles: []
})
export class MainComponent implements OnInit {
  items: Observable<DbItem[]>;
  selected: Observable<DbItem>;
  constructor(private store: Store<State>) {
    this.items = store.select('app', 'items')
    this.selected = store.select('app', 'selected')
  }

  ngOnInit() {
  }

  onSave(item: DbItem) {
    console.log("saving " + item.name); // TODO change to UPDATE_ITEM once dynamodb conected
    this.store.dispatch({ type: "ITEM_UPDATED", payload: item });
  }

  onSelect(item: DbItem) {
    this.store.dispatch({ type: "SELECT", payload: item });
  }
}
