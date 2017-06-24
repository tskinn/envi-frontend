import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { ImportComponent } from './import/import.component';
import { ExportComponent } from './export/export.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'edit',
    component: EditComponent
  },
  {
    path: 'import',
    component: ImportComponent
  },
  {
    path: 'export',
    component: ExportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
