import { Component, OnInit } from '@angular/core';

import { DynamodbService } from '../../core/dynamodb.service';

import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-import',
  templateUrl: 'import.component.html',
  styles: [`
div {
#  width: 500px;
#  height: 600px;
}
input {
#width: 100%;
width: 300px;
}
textarea {
#  width: 500px;
  width: 100%;
  height: 350px;
}
button {
#  width: 100%;
}
`]
})
export class ImportComponent implements OnInit {

  constructor(private dbService: DynamodbService, public dialogRef: MdDialogRef<ImportComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
