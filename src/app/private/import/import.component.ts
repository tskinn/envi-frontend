import { Component, OnInit } from '@angular/core';

import { DynamodbService } from '../../core/dynamodb.service';


@Component({
  selector: 'app-import',
  template: `
    <p>
      import Works!
    </p>
    <md-input-container>
      <input mdInput>
    </md-input-container>
    <md-input-container>
      <input mdInput>
    </md-input-container>
  `,
  styles: []
})
export class ImportComponent implements OnInit {

  constructor(private dbService: DynamodbService) { }

  ngOnInit() {
  }

}
