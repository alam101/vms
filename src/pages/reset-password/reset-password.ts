import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage,MenuController,AlertController,Platform } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  domainId:string="";
  prefix:string;
  constructor(private platform:Platform,public global:GlobalProvider,public alertCtrl: AlertController,private menu:MenuController,public navCtrl: NavController, public navParams: NavParams) {
     this.getIssues();
  }
  //Disable the swiping of menu
  ionViewDidEnter() {
    this.menu.swipeEnable(false);

  }
  //Validate input Length
  validateLength(event){
    this.domainId=this.global.validateDomain(event);
  }
  // this function used to get prefix to reset password
  getIssues(){
    this.global.readSMSDetail().then(res=>{
      var data=JSON.parse(JSON.parse(JSON.stringify(res))._body)[2];
      console.log(JSON.stringify(data));
     this.prefix=data.resetPassword[0].prefix;
    });
}

  //send SMS for reset password
  sendSMS(){
    if(this.domainId.trim().length>0){
      this.global.sendSMS(this.prefix, this.domainId).then( (isSuccess) =>{
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
    else{
      this.global.toastMessage(this.global.resetMandatory);
    }
   }
   // go back to home page
   cancel(){
     this.navCtrl.setRoot("HomePage");
   }
}
