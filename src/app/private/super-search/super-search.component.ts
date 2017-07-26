import { Component, OnInit } from '@angular/core';

import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-super-search',
  template: `
    <p>
      super-search Works!
    </p>
  `,
  styles: []
})
export class SuperSearchComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<SuperSearchComponent>) { }

  ngOnInit() {
  }

}
