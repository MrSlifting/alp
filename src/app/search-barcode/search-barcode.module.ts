import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchBarcodePageRoutingModule } from './search-barcode-routing.module';

import { SearchBarcodePage } from './search-barcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchBarcodePageRoutingModule
  ],
  declarations: [SearchBarcodePage]
})
export class SearchBarcodePageModule {}
