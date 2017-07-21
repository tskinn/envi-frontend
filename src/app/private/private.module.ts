import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdIconModule, MdInputModule, MdSortModule, MdButtonToggleModule } from '@angular/material';

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
    MdSortModule,
    MdButtonToggleModule
  ],
  exports: [
    MdIconModule,
    MdInputModule,
    MdSortModule,
    MdButtonToggleModule
  ],
  declarations: [SearchComponent, EditComponent, ImportComponent, ExportComponent, MainComponent]
})
export class PrivateModule { }
