import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <md-toolbar color="primary">
      <span>Welcome to {{title}}!!</span>
    </md-toolbar>
    <nav md-tab-nav-bar color="primary">
      <a md-tab-link
			 *ngFor="let link of navLinks"
			 [routerLink]="link"
			 routerLinkActive #rla="routerLinkActive"
			 [active]="rla.isActive">
			 {{link}}
	   </a>
	 </nav>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'app';
  navLinks = ["search", "edit", "io"]
}
