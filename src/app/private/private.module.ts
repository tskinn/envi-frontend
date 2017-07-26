import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdToolbarModule, MdDialogModule, MdIconModule, MdInputModule, MdButtonModule, MdButtonToggleModule, MdCardModule, MdListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgFuseModule } from 'ng2-fuse';

import { PrivateRoutingModule } from './private-routing.module';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { ImportComponent } from './import/import.component';
import { ExportComponent } from './export/export.component';
import { MainComponent } from './main/main.component';
import { VarsComponent } from './vars/vars.component';
import { VarComponent } from './var/var.component';
import { SuperSearchComponent } from './super-search/super-search.component';

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MdIconModule,
    MdInputModule,
    MdButtonToggleModule,
    MdCardModule,
    MdButtonModule,
    MdListModule,
    MdDialogModule,
    NgFuseModule,
    MdToolbarModule,
    FlexLayoutModule
  ],
  exports: [
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdListModule,
    MdDialogModule
  ],
  entryComponents: [SuperSearchComponent, ImportComponent, ExportComponent],
  declarations: [SearchComponent, EditComponent, ImportComponent, ExportComponent, MainComponent, VarsComponent, VarComponent, SuperSearchComponent]
})
export class PrivateModule { }
