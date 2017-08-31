import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DbItem, Var } from '../core/db-item';

@Component({
  selector: 'app-vars',
  templateUrl: './vars.component.html',
  styles: [`
  md-card {
    margin: 25px 25px 0px 0px;
  }
  button {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
  app-var {
    margin: 5px;
  }
`]
})
export class VarsComponent implements OnInit {

  @Input()
  set item(item: DbItem) {
    this.original = item;
    this.copy = { ...item };
    this.dirty = false;
  }

  @Output()
  onSave = new EventEmitter<DbItem>();

  original: DbItem; // TODO do we really need two versions? maybe not
  copy: DbItem;     //
  dirty: boolean;   // should we really send out a save request?

  constructor() {
  }

  ngOnInit() { }

  save() {
    if (this.dirty)
      this.onSave.emit(this.copy);
  }

  onEdit({ old, fresh }) {
    this.dirty = true; // TODO be a little more thorough with checking if values are different
    if (old == null) { // new key
      // only push
      this.copy.variables.push(fresh);
    } else {
      // replace Var
      // create new list without old var
      let varList = this.copy.variables.filter(item => item.name != old.name);
      // add updated var
      varList.push(fresh);
      this.copy.variables = varList;
      console.log(this.original);
      console.log(this.copy);
    }
  }
}
