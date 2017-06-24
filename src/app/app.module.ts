import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MdToolbarModule,
  MdInputModule,
  MdTabsModule,
  MdSidenavModule,
  MdListModule,
  MdIconModule,
  MdButtonModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Feature Modules */
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MdToolbarModule,
    MdInputModule,
    MdTabsModule,
    MdSidenavModule,
    MdListModule,
    MdIconModule,
    MdButtonModule,
    FlexLayoutModule
  ],
  exports: [
    MdToolbarModule,
    MdInputModule,
    MdTabsModule,
    MdSidenavModule,
    MdListModule,
    MdIconModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
