import { Component, OnInit } from '@angular/core';

import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-super-search',
  template: `
<p>
  super-search Works!
</p>
<button (click)="close()">close</button>
`,
  styles: []
})
export class SuperSearchComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<SuperSearchComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close("hello there");
  }

}
