import { Component, OnInit, Input } from '@angular/core';

import { DbItem, Var } from '../../core/db-item';

@Component({
  selector: 'app-vars',
  template: `
  <md-card>
    <md-card-header>
    <md-card-title>{{original.name}}</md-card-title>
    <md-card-subtitle>{{original.environment}}</md-card-subtitle>
    </md-card-header>
    <md-card-content>
      <md-input-container>
        <input mdInput #listFilter (keyup)="o" placeholder="search">
      </md-input-container>
      <app-var fxLayout="row" *ngFor="let envVar of (original.vars | ngFuse:listFilter.value:{keys: ['key', 'value']})" [item]="envVar" (onEdit)=onEdit($event)></app-var>
    </md-card-content>
    <button md-fab><md-icon>add</md-icon></button>
    <button md-fab><md-icon>save</md-icon></button>
  </md-card>
  `,
  styles: [`
  md-card {
    margin: 30px;
  }
`]
})
export class VarsComponent implements OnInit {

  @Input()
  set item(item: DbItem) {
    this.original = item;
    this.copy = { ...item };
  }

  original: DbItem;

  copy: DbItem;

  constructor() { }

  ngOnInit() { }

  onEdit({ old, fresh }) {
    if (old == null) { // new key
      // only push
      this.copy.vars.push(fresh);
    } else {
      // replace Var
      // create new list without old var
      let varList = this.copy.vars.filter(item => item.key != old.key);
      // add updated var
      varList.push(fresh);
      this.copy.vars = varList;
      console.log(this.original);
      console.log(this.copy);
    }
  }
}
