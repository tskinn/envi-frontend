import { Component, OnInit } from '@angular/core';

import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-export',
  template: `
    <p>
      export Works!
    </p>
  `,
  styles: []
})
export class ExportComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<ExportComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close("we're closed");
  }

}
