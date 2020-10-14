import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchBarcodePage } from './search-barcode.page';

const routes: Routes = [
  {
    path: '',
    component: SearchBarcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchBarcodePageRoutingModule {}
