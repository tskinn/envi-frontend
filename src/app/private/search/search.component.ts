import { Component, OnInit } from '@angular/core';

import { DynamodbService } from '../../core/dynamodb.service';

@Component({
  selector: 'app-search',
  template: `
    <md-input-container>
      <input mdInput placeholder="search">
    </md-input-container>
    <p>
      search Works!
    </p>
  `,
  styles: []
})
export class SearchComponent implements OnInit {

  constructor(private ddb: DynamodbService) { }

  ngOnInit() {
  }

}
