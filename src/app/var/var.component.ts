import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Var } from '../core/db-item';

@Component({
  selector: 'app-var',
  template: `
  <md-list-item fxFlex="0 1 auto" (click)="focus($event, key)">
    <input mdInput value="{{_item.name}}" onClick="this.select()" #key (keyup)="editKey(key.value)">
  </md-list-item>
  <md-icon fxFlex="0 1 auto" class="hello">drag_handle</md-icon>
  <md-list-item fxFlex="1 1 100%" (click)="focus($event, value)">
    <textarea mdInput value="{{_item.value}}" onClick="this.select()" #value (keyup)="editValue(value.value)">
    </textarea>
  </md-list-item>
  <md-list-item fxFlex="0 1 auto">
    <md-icon>delete</md-icon>
  </md-list-item>
  `,
  styles: [`
    .hello {
      margin: 8px 5px;
    }
    textarea {
      resize: none;
    }
  `]
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

  focus(e, el) {
    el.select();
  }

  ngOnInit() {
  }

  editKey(key: string) {
    this.edit(this.copy, { 'name': key, 'value': this.copy.value });
    this.copy.name = key;
  }

  editValue(value: string) {
    this.edit(this.copy, { 'name': this.copy.name, 'value': value });
    this.copy.value = value;
  }

  edit(old: Var, fresh: Var) {
    this.onEdit.emit({ old: old, fresh: fresh });
  }
}
