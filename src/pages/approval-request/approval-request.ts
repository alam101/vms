import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, AlertController,Platform } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-approval-request',
  templateUrl: 'approval-request.html',
})
export class ApprovalRequestPage {
  requestNo: string = "";
  prefix: string = "";
  col: number = 2;
  val: string;
  constructor(private platform:Platform,public alertCtrl: AlertController, private menu: MenuController, public global: GlobalProvider, public navCtrl: NavController) {
    this.getIssues();
  }
  //validation of length into input field
  validateLength(event) {
    this.requestNo =this.global.validateLength(event);
   }
  //disable left menu swipping 
  ionViewDidEnter() {
    this.menu.swipeEnable(false);

  }
  //Get list of Issues for dropdown
  getIssues() {
    this.global.readSMSDetail().then(res => {
      var data = JSON.parse(JSON.parse(JSON.stringify(res))._body)[1];
      console.log(JSON.stringify(data));
      this.prefix = data.approveRequest[0].prefix;
    });
  }
  //send sms
  sendSMS() {
    if (this.requestNo.trim().length > 0) {
      this.global.sendSMS(this.prefix, this.requestNo).then( (isSuccess) =>{
        if(isSuccess){
          if(this.platform.is('android')){
            this.global.showMessage(this.global.successMessage,(res)=>{
              this.navCtrl.setRoot(res);
            });
          }
          else{
            this.navCtrl.setRoot("HomePage");
          }
        }
        else{
          this.global.showMessage(this.global.failedMessage,(res)=>{});
        }
      });
    }
    else {
      this.global.toastMessage(this.global.mandatory);
    }
   
  }
  //Redirect to home page
  cancel() {
    this.navCtrl.setRoot("HomePage");
  }
}
