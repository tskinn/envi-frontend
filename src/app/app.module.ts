import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
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

import { OAuthModule } from 'angular-oauth2-oidc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgFuseModule } from 'ng2-fuse';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { BulkComponent } from './bulk/bulk.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { VarsComponent } from './vars/vars.component';
import { VarComponent } from './var/var.component';
import { ImportComponent } from './import/import.component';
import { ExportComponent } from './export/export.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BulkComponent,
    MainComponent,
    SearchComponent,
    VarsComponent,
    VarComponent,
    ImportComponent,
    ExportComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    FlexLayoutModule,
    HttpModule,
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdSidenavModule,
    MdTabsModule,
    MdToolbarModule,
    NgFuseModule,
    OAuthModule.forRoot()
  ],
  exports: [
    MdDialogModule,
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
