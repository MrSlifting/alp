import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

import { product } from '../../assets/data/product';
import { AngularFireDatabase } from '@angular/fire/database';

import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/browser';
import DecodeHintType from '@zxing/library/esm/core/DecodeHintType';

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

  codeReader: any;
  firstDeviceId: any;

  handleText: string;

  constructor(private db: AngularFireDatabase, private alertController: AlertController, private toastController: ToastController) {
    this.SoldByInstore = "EA";
    this.SoldByOnline = "EA";
    this.VariantTaxable = false;

    this.InitializeCam();
  }

  InitializeCam() {
    this.codeReader = new BrowserMultiFormatReader();
    const hints = new Map();
    const formats = [BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.UPC_A, BarcodeFormat.UPC_E, BarcodeFormat.UPC_EAN_EXTENSION, BarcodeFormat.QR_CODE, BarcodeFormat.CODE_128];

    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    this.codeReader.setHints(hints)

    BrowserMultiFormatReader.listVideoInputDevices()
      .then(videoInputDevices => {
        this.firstDeviceId = videoInputDevices[1].deviceId === undefined ? videoInputDevices[0].deviceId : videoInputDevices[1].deviceId;
        this.codeReader
          .decodeOnceFromVideoDevice(this.firstDeviceId, 'video')
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  ScanCode() {
    this.codeReader
      .decodeOnceFromVideoDevice(this.firstDeviceId, 'video')
      .then(result => this.handle = result.toString())
      .catch(err => console.error(err));
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
      this.ConvertBarcode();

      this.WriteProductData(
        this.handleText,
        this.Department,
        this.ENname,
        this.CNname,
        this.Specs,
        this.Weight,
        this.OnlinePrice,
        this.SoldByOnline,
        this.SoldByInstore,
        this.VariantTaxable
      );
    }
  }

  WriteProductData(handle, type, title, cnname, specs, weight, onlineprice, soldbyonline, soldbyinstore, varianttaxable) {
    this.db.database.ref('products/' + handle).set({
      Handle: handle,
      Type: type,
      Title: title,
      CNname: cnname,
      Specs: specs,
      Weight: weight,
      OnlinePrice: onlineprice,
      SoldByOnline: soldbyonline,
      SoldByInstore: soldbyinstore,
      VariantTaxable: varianttaxable
    });
  }

  ValidateData() {
    this.SoldByInstore = this.SoldByInstore === "EA" ? "EA" : "LB";
    this.SoldByOnline = this.SoldByOnline === "EA" ? "EA" : "LB";
    this.Specs = this.Specs === undefined ? "" : this.Specs;
    this.Weight = this.Weight === undefined ? "" : this.Weight;
  }

  ConvertBarcode() {
    this.handleText = this.handle.toString().substring(0, this.handle.toString().length - 1);
    while (this.handleText.length < 15) {
      this.handleText = '0' + this.handleText;
    }
    this.handleText = 'alp-o' + this.handleText;
  }

  ClearInput() {
    this.handle = undefined;
    this.ENname = undefined;
    this.CNname = undefined;
    this.OnlinePrice = undefined;
    this.Department = undefined;
    this.Specs = undefined;
    this.Weight = undefined;
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

  //Notification message function for input
  async presentNoti(txt: string) {
    const notification = await this.toastController.create({
      message: txt,
      duration: 2000,
      position: 'bottom'
    });
    await notification.present();
  }
}
