import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { product } from '../../assets/data/product';
import { AngularFireDatabase } from '@angular/fire/database';

import { BrowserMultiFormatReader } from '@zxing/library';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  handle: string;
  Department: string;
  ENname: string;
  CNname: string;
  Specs: string;
  Weight: string;
  OnlinePrice: number;
  SoldByOnline: string;
  SoldByInstore: string;
  VariantTaxable: boolean;

  constructor(private db: AngularFireDatabase, private alertController: AlertController) {
    this.SoldByInstore = "EA";
    this.SoldByOnline = "EA";
    this.VariantTaxable = false;
  }



  //Boolean
  //Check sold unit
  soldByEA(): boolean {
    var sbea = this.SoldByInstore === "EA" ? true : false;
    return sbea;
  }

  AddProduct() {
    if (this.inputCheck()) {
      this.ValidateData();
      this.db.list<product>("products")
        .push({
          Handle: this.handle,
          Type: this.Department,
          Title: this.ENname,
          CNname: this.CNname,
          Specs: this.Specs,
          Weight: this.Weight,
          OnlinePrice: this.OnlinePrice,
          SoldByOnline: this.SoldByOnline,
          SoldByInstore: this.SoldByInstore,
          VariantTaxable: this.VariantTaxable
        });
    }
  }

  ValidateData() {
    this.SoldByInstore = this.SoldByInstore === "EA" ? "EA" : "LB";
    this.SoldByOnline = this.SoldByOnline === "LB" ? "EA" : "LB";
    this.Specs = this.Specs === undefined ? "" : this.Specs;
    this.Weight = this.Weight === undefined ? "" : this.Weight;
  }

  inputCheck(): Boolean {
    if (this.handle === undefined) {
      this.presentAlert('条码');
      return false;
    }
    if (this.ENname === undefined) {
      this.presentAlert('英文名称');
      return false;
    }
    if (this.CNname === undefined) {
      this.presentAlert('中文名称');
      return false;
    }
    if (this.OnlinePrice === undefined) {
      this.presentAlert('价格');
      return false;
    }
    if (this.Department === undefined) {
      this.presentAlert('部门');
      return false;
    }
    if (this.soldByEA() && this.Specs === undefined) {
      this.presentAlert('规格');
      return false;
    }
    if (!this.soldByEA() && this.Weight === undefined) {
      this.presentAlert('重量');
      return false;
    }
    else {
      return true;
    }
  }

  //Alert message function for input
  async presentAlert(text: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '提示',
      subHeader: '没有输入' + text,
      message: '请输入' + text,
      buttons: ['确认']
    });
    await alert.present();
  }
}
