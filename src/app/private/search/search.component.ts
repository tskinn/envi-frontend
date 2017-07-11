import { Component, OnInit, Input, Output } from '@angular/core';
import { Sort } from '@angular/material';
import { DbItem } from '../../core/db-item';

@Component({
  selector: 'app-search',
  template: `
    <md-input-container>
      <input mdInput placeholder="search">
    </md-input-container>
    <table mdSort (mdSortChange)="sortData($event)">
      <tr>
        <th md-sort-header="name">Name</th>
        <th md-sort-header="environment">Environment</th>
      </tr>
      <tr *ngFor="let item of items">
        <td>{{item.name}}</td>
        <td>{{item.environment}}</td>
      </tr>
    </table>
    <p>
      search Works!
    </p>
  `,
  styles: []
})
export class SearchComponent implements OnInit {

  @Input()
  items: DbItem[];

  @Output()
  selectedItem: DbItem;

  constructor() { }

  ngOnInit() {
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
