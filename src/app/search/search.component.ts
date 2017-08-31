import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DbItem } from '../core/db-item';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styles: [`
  div {
    margin: 25px;
    width: 450px;
    border: 1px;
  }
  .md-button-toggle {
    line-height: 0px;
  }
  h3 {
    margin: 10px;
  }
  p {
    margin: 10px;
  }
  button {
    margin: 5px;
    padding: 0px;
  }
  .selected {
    background-color: #dcdcdc;
  }
`]

})
export class SearchComponent implements OnInit {

  @Input()
  items: DbItem[];

  @Input()
  selected: string;

  @Output()
  onSelect = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  select(item: DbItem) {
    this.selected = item.id;
    this.onSelect.emit(item.id);
  }
}
