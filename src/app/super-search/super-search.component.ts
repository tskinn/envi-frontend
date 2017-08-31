import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'

import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/map'

import { DbItem, Var } from '../core/db-item';
import { State } from '../core/state/model';
import { getItems } from '../core/state/reducer';

@Component({
  selector: 'app-super-search',
  templateUrl: 'super-search.component.html',
  styles: [`
.super-search-container {
  width: 600px;
}
md-nav-list {
  overflow: auto;
  height: 500px;
  width: 100%;
}
`]
})
export class SuperSearchComponent implements OnInit {

  items: DbItem[];
  vars: Observable<FlatVar[]>;
  selected: FlatVar;

  constructor(public dialogRef: MdDialogRef<SuperSearchComponent>,
    private store: Store<State>) {
    store.select(getItems).subscribe(items => this.items = items);
    this.vars = store.select(getItems).map((dbItems: DbItem[]) => {
      let vars: FlatVar[] = [];
      dbItems.forEach(item => {
        item.variables.forEach(v => {
          vars.push(new FlatVar(v, item.application, item.environment, item.id.toString()));
        });
      });
      return vars;
    })
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(this.selected);
  }

  select(dbItem: any) {
    this.store.dispatch({ type: 'SELECT', payload: { id: dbItem.item.id } })
  }
}

// TOOD make a pipe to clean up the html
export class FlatVar {
  v: Var;
  name: string;
  environment: string;
  id: string;

  constructor(v: Var, name: string, environment: string, id: string) {
    this.v = v;
    this.name = name;
    this.environment = environment;
    this.id = id;
  }
}
