import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  date = new Date();
  currentDate = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + ((this.date.getDate() < 10) ? "0" + this.date.getDate() : this.date.getDate());

  respondText: string;
  dateFormatted: any;
  timeFormatted: any;

  orderNum: number;
  dateSelected: string;
  timeSelected: string;
  deliveryMethod: string;

  constructor(private clipboard: Clipboard, 
    private alertController: AlertController,
    private toastCtrl:ToastController) { }

  //Format date and time
  formatDate() {
    this.dateFormatted = new Date(this.dateSelected);
    this.timeFormatted = new Date(this.timeSelected);

    this.dateFormatted = [
      this.dateFormatted.toLocaleDateString([], { month: "numeric" }),
      this.dateFormatted.toLocaleDateString([], { day: "numeric" })
    ]
    this.timeFormatted = this.timeFormatted.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  //Copy text to clipboard
  copyResponse() {
    this.clipboard.copy(this.respondText);
    this.presentNoti();
  }

  //Generate response text
  genText() {
    if (this.inputCheck()) {
      this.formatDate();
      if (this.deliveryMethod == "配送") {
        this.respondText =
          "您好，\n请问您的订单#" + this.orderNum
          + "\n是" + this.dateFormatted[0]
          + this.dateFormatted[1]
          + this.deliveryMethod + "吗？"
          + "\n如果是，请您回复一下这条消息，谢谢😊"
          + "\n华盛密西沙加 Al Premium Mississauga";
      }
      else {
        this.respondText =
          "您好，\n请问您的订单#" + this.orderNum
          + "\n是" + this.dateFormatted[0]
          + this.dateFormatted[1]
          + " " + this.timeFormatted
          + this.deliveryMethod + "吗？"
          + "\n如果是，请您回复一下这条消息，谢谢😊"
          + "\n华盛密西沙加 Al Premium Mississauga";
      }
    }
  }

  //Boolean function checking delivery method
  isPickup(): boolean {
    return this.deliveryMethod === "自取" ? true : false;
  }

  //Boolean function checking input fields
  inputCheck(): Boolean {
    if (this.orderNum === undefined) {
      this.presentAlert('订单号');
      return false;
    }
    if (this.dateSelected === undefined) {
      this.presentAlert('日期');
      return false;
    }
    if (this.timeSelected === undefined && this.deliveryMethod == "自取") {
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
  async presentNoti() {
    const notification = await this.toastCtrl.create({
      message: '复制成功！',
      duration: 2000,
      position: 'bottom'
    });
    await notification.present();
  }

}
