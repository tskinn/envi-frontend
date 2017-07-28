import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'

import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/map'

import { DbItem, Var } from '../../core/db-item';
import { State } from '../../core/model';

@Component({
  selector: 'app-super-search',
  templateUrl: 'super-search.component.html',
  styles: [`
.super-search-container {
  min-width: 400px;
}
md-nav-list {
overflow: auto;
max-height: 400px;
}
`]
})
export class SuperSearchComponent implements OnInit {

  vars: Observable<FlatVar[]>;
  selected: FlatVar;

  constructor(public dialogRef: MdDialogRef<SuperSearchComponent>,
    private store: Store<State>) {
    this.vars = store.select('app', 'items').map((dbItems: DbItem[]) => {
      let vars: FlatVar[] = [];
      dbItems.forEach(item => {
        item.vars.forEach(v => {
          vars.push(new FlatVar(v, item.name, item.environment, item.id.toString()));
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

  select(dbItem: FlatVar) {
    this.selected = dbItem;
  }
}

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
