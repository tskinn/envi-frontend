import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <p>
      main Works!
    </p>
    <app-search></app-search>
  `,
  styles: []
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
