import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Sort } from '@angular/material';
import { DbItem } from '../../core/db-item';

@Component({
  selector: 'app-search',
  template: `
    <md-input-container>
      <input mdInput #listFilter (keyup)="o" placeholder="search">
    </md-input-container>
    <md-nav-list>
      <a md-list-item *ngFor="let item of (items | ngFuse:listFilter.value:{keys: ['name', 'environment']})" (click)="select(item)">
        <h3 md-line>{{item.name}}</h3>
        <p md-line>{{item.environment}}</p>
      </a>
    </md-nav-list>
    <p>
      search Works!
    </p>
  `,
  styles: [`
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

  sortData(sort: Sort) {
    const data = this.items.slice();
    if (!sort.active || sort.direction == '') {
      this.items = data;
      return;
    }

    this.items = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'environment': return compare(a.environment, b.environment, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
