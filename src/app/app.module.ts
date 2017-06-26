import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdToolbarModule,
  MdInputModule,
  MdTabsModule,
  MdSidenavModule,
  MdListModule,
  MdIconModule,
  MdButtonModule,
  MdCardModule
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
    MdCardModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  exports: [
    MdToolbarModule,
    MdInputModule,
    MdTabsModule,
    MdSidenavModule,
    MdListModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
