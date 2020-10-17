import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  date = new Date();
  currentDate = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();

  respondText: string;
  dateFormatted: any;
  timeFormatted: any;

  orderNum: number;
  dateSelected: string;
  timeSelected: string;
  deliveryMethod: string;

  constructor(private clipboard: Clipboard, public alertController: AlertController) { }

  formatDate() {
    this.dateFormatted = new Date(this.dateSelected);
    this.timeFormatted = new Date(this.timeSelected);

    this.dateFormatted = [
      this.dateFormatted.toLocaleDateString([], { month: "numeric" }),
      this.dateFormatted.toLocaleDateString([], { day: "numeric" })
    ]
    this.timeFormatted = this.timeFormatted.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  copyResponse() {
    this.clipboard.copy(this.respondText);
  }

  genText() {
    if (this.inputCheck()) {
      this.formatDate();
      this.respondText =
        "您好，\n请问您的订单#" + this.orderNum
        + "\n是" + this.dateFormatted[0] + "月"
        + this.dateFormatted[1] + "日"
        + " " + this.timeFormatted
        + this.deliveryMethod + "吗？"
        + "\n如果是，请您回复一下这条消息，谢谢😊"
        + "\n华盛密西沙加 Al Premium Mississauga";
    }
  }

  inputCheck(): Boolean {
    if (this.orderNum === undefined) {
      this.presentAlert('订单号');
      return false;
    }
    if (this.dateSelected === undefined) {
      this.presentAlert('日期');
      return false;
    }
    if (this.timeSelected === undefined) {
      this.presentAlert('时间');
      return false;
    }
    if (this.deliveryMethod === undefined) {
      this.presentAlert('取货方式');
      return false;
    }
    else {
      return true;
    }
  }

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
