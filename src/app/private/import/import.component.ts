import { Component, OnInit } from '@angular/core';

import { DynamodbService } from '../../core/dynamodb.service';

import { MdDialogRef } from '@angular/material';


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

  constructor(private dbService: DynamodbService, public dialogRef: MdDialogRef<ImportComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
