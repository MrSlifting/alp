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


  
  //Boolean
  //Check sold unit
  soldByEA(): boolean {
    var sbea = this.SoldByInstore === "SoldByInstoreEA" ? true : false;
    return sbea;
  }
}
