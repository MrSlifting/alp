import { Component, OnInit } from '@angular/core';
import products from '../../assets/data/products.json';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-search-barcode',
  templateUrl: './search-barcode.page.html',
  styleUrls: ['./search-barcode.page.scss'],
})
export class SearchBarcodePage implements OnInit {

  searchKeywd: string;
  searchType: string;
  results: any;

  constructor(public alertController: AlertController) { }


  ngOnInit() {
  }

  getProduct() {
    switch (this.searchType) {
      case "zhName": this.results = products.filter(key => key.zhName.includes(this.searchKeywd)); break;
      case "enName": this.results = products.filter(key => key.enName.includes(this.searchKeywd)); break;
      case "department": this.results = products.filter(key => key.department.includes(this.searchKeywd)); break;
      default: this.presentAlert();
    }
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '提示',
      subHeader: '没有选择搜索类型',
      message: '请输入搜索类型',
      buttons: ['确认']
    });
    await alert.present();
  }

}
