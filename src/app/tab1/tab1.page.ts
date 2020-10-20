import { Component } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/library';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  SoldByInstore: any;
   

  constructor() { }

  soldByEA(): boolean {
    if (this.SoldByInstore === "SoldByInstoreEA") {
      return true;
    }
    else {
      return false;
    }
  }

}
