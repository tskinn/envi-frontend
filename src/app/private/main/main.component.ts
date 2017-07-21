import { Component, OnInit } from '@angular/core';

import { DbItem } from '../../core/db-item';

@Component({
  selector: 'app-main',
  template: `
    <p>
      main Works!
    </p>
    <app-search (onSelect)="onSelect($event)" [items]="items"></app-search>
    <p *ngIf="selected">Selected: {{selected.name}} Id: {{selected.id}} </p>
  `,
  styles: []
})
export class MainComponent implements OnInit {
  items: DbItem[];
  selected: DbItem;
  constructor() {
    this.items = [
      { "id": 1243, "name": "kms-object-reps", "environment": "production", "vars": { "DNS": "yes" }, "lock": 1 },
      { "id": 1244, "name": "kms-object-reps", "environment": "staging", "vars": { "vars": "no" }, "lock": 1 },
      { "id": 124213, "name": "kms-api-event-registration", "environment": "production", "vars": { "vars": "yes" }, "lock": 1 },
      { "id": 12423, "name": "kms-api-event-registration", "environment": "staging", "vars": { "vars": "ok" }, "lock": 1 }]
  }

  ngOnInit() {
  }

  onSelect(item: DbItem) {
    this.selected = item;
  }
}
