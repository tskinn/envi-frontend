import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Var } from '../../core/db-item';

@Component({
  selector: 'app-var',
  template: `
  <md-input-container>
    <input mdInput value="{{_item.key}}" onClick="this.select()" #key (keyup)="editKey(key.value)">
  </md-input-container>
  <md-input-container>
    <input mdInput value="{{_item.value}}" onClick="this.select()" #value (keyup)="editValue(value.value)">
  </md-input-container>
  `,
  styles: []
})
export class VarComponent implements OnInit {

  @Input()
  set item(item: Var) {
    this._item = item;
    this.copy = { ...item };
  }

  _item: Var;

  copy: Var;

  @Output()
  onEdit = new EventEmitter<{ old: Var, fresh: Var }>();

  constructor() { }

  ngOnInit() {
  }

  editKey(key: string) {
    this.edit(this.copy, { "key": key, "value": this.copy.value });
    this.copy.key = key;
  }

  editValue(value: string) {
    this.edit(this.copy, { "key": this.copy.key, "value": value });
    this.copy.value = value;
  }

  edit(old: Var, fresh: Var) {
    this.onEdit.emit({ old: old, fresh: fresh });
  }
}
