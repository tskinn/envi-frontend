import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DbItem } from '../../core/db-item';

@Component({
  selector: 'app-search',
  template: `
  <md-card>
    <md-input-container>
      <input mdInput #listFilter (keyup)="o" placeholder="search">
    </md-input-container>
    <md-nav-list>
      <a md-list-item *ngFor="let item of (items | ngFuse:listFilter.value:{keys: ['name', 'environment']})" (click)="select(item)">
        <h3 md-line>{{item.name}}</h3>
        <p md-line>{{item.environment}}</p>
      </a>
    </md-nav-list>
  </md-card>
  `,
  styles: [`
  md-card {
    margin: 30px;
    width: 350px;
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
