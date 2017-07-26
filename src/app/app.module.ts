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
  MdCardModule,
  MdMenuModule,
  MdDialogModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Feature Modules */
import { CoreModule } from './core/core.module';

import { SuperSearchComponent } from './private/super-search/super-search.component';


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
    MdMenuModule,
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
    MdCardModule,
    MdMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
