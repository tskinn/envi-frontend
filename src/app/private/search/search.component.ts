import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DbItem } from '../../core/db-item';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styles: [`
  md-card {
    margin: 25px;
    width: 450px;
  }
  span {
    position: relative;
    right: -15px;
    top: -20px;
    padding-bottom: -10px;
  }
  .md-button-toggle {
    line-height: 0px;
  }
`]
})
export class SearchComponent implements OnInit {

  @Input()
  items: DbItem[];

  @Output()
  onSelect = new EventEmitter<DbItem>();

  constructor() { }

  ngOnInit() {
  }

  select(item: DbItem) {
    this.onSelect.emit(item);
  }
}
