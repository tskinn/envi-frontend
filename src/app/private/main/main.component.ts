import { Component, OnInit } from '@angular/core';

import { DbItem } from '../../core/db-item';

@Component({
  selector: 'app-main',
  template: `
    <p>
      main Works!
    </p>
    <app-search [items]="items"></app-search>
  `,
  styles: []
})
export class MainComponent implements OnInit {
  items: DbItem[];
  constructor() {
    this.items = [{ "name": "one", "environment": "production", "vars": "vars", "lock": 1 },
    { "name": "two", "environment": "production", "vars": "vars", "lock": 1 },
    { "name": "one", "environment": "staging", "vars": "vars", "lock": 1 },
    { "name": "two", "environment": "staging", "vars": "vars", "lock": 1 }]
  }

  ngOnInit() {
  }

}
