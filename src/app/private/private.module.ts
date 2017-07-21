import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdInputModule, MdButtonToggleModule, MdListModule } from '@angular/material';

import { NgFuseModule } from 'ng2-fuse';

import { PrivateRoutingModule } from './private-routing.module';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { ImportComponent } from './import/import.component';
import { ExportComponent } from './export/export.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MdIconModule,
    MdInputModule,
    MdButtonToggleModule,
    MdListModule,
    NgFuseModule
  ],
  exports: [
    MdIconModule,
    MdInputModule,
    MdButtonToggleModule,
    MdListModule
  ],
  declarations: [SearchComponent, EditComponent, ImportComponent, ExportComponent, MainComponent]
})
export class PrivateModule { }
